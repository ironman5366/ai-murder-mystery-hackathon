
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import copy
import anthropic
from types import InvocationRequest
from db import get_conn
from settings import MODEL, MODEL_KEY


app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def create_conversation_turn(request: InvocationRequest) -> int:
    conn = get_conn()
    with conn.cursor() as cur:
        serialized_chat_messages = [msg.model_dump() for msg in request.actor.messages]
        cur.execute(
            "INSERT INTO conversation_turns (session_id, character_file_version, model, model_key, actor_name, chat_messages) "
            "VALUES (%s, %s, %s, %s) RETURNING id",
            (request.session_id, request.character_file_version,
             MODEL, MODEL_KEY, request.actor.name, serialized_chat_messages, )
        )
        turn_id = cur.fetchone()
    return turn_id


def prompt_ai(request: InvocationRequest) -> InvocationResponse:
    turn_id = create_conversation_turn(request)
    print(f"Serving turn {turn_id}")

    # UNREFINED

    unrefined_output = anthropic.Anthropic().messages.create(
        model=MODEL,
        system=system_prompt,
        messages=messages,
        max_tokens=anthropic_max_tokens,
    ).content[0].text

    # CRITIQUER

    critique_messages = []
    critique_messages.append(
        ChatMessage(
            role="user",
            content=f"<dialogue> {unrefined_output} </dialogue>",
        )
    )

    critique_prompt = f"""
        <instructions> Which of the following disallowed story details (text contained within <disallowed> brackets) are in the input dialogue (the text contained within <dialogue> brackets)? 

        User dialogue comes from the {request.actor.name}.
        Here is background about the story: <story> {request.global_story} </story>
        And here is background about {request.actor.name}: <character> {request.actor.context} </character> 

        <disallowed> {request.actor.violation} Dialogue not in the POV of {request.actor.name}. </disallowed>

        Exactly what part of {request.actor.name}'s dialogue is incorrect? Your response must be under 30 words. OR if the dialogue is correct without issues, state the exact phrase 'There are no issues!'.

        Explain to me why the dialogue is correct or otherwise provide the specific incorrect part of dialogue and why you think it is incorrect.
        Your response must ONLY detect what is allowed or disallowed. ONLY explain what user inputs are allowed or disallowed and why. 
        </instructions>
        """

    critique_chat_response = anthropic.Anthropic().messages.create(
        model=MODEL,
        system=critique_prompt,
        messages=critique_messages,
        max_tokens=anthropic_max_tokens,
    ).content[0].text

    if "There are no issues!" in critique_chat_response:
        return {
            "response": unrefined_output
        }

    # REFINER
    refiner_messages = []
    refiner_messages.append(
        ChatMessage(
            role="user",
            content=critique_chat_response,
        )
    )

    refined_prompt = f"""
        Your job is to edit conversation for a murder mystery video game. This dialogue comes from the character {request.actor.name} in response to the following prompt: {original_user_message['content']}.

        Here is story background specific to {request.actor.name}: {request.actor.context} {request.actor.secret}

        Your revised dialogue MUST be less than 60 words long, consistent with the story background, and free of the following problems: {critique_chat_response}.

        Your output revised conversational dialogue must be as identical as possible to the original user message and consistent with the following personality: {request.actor.personality}. Make as few changes as possible to the original input!

        NO QUOTATION MARKS ALLOWED. NO COMMENTARY ON STORY CONSISTENCY OR CRITICISMS.
        """

    # print(f"\nrefined_prompt: {refined_prompt}\n")

    refined_chat_response = anthropic.Anthropic().messages.create(
        model=MODEL,
        system=refined_prompt,
        messages=refiner_messages,
        max_tokens=anthropic_max_tokens,
    ).content[0].text

    # FINAL CHECK

    final_prompt = f"""
        Does this text look like it comes from a fictional character in a story, from a murder mystery suspect, from an AI assistant, from a proofreader, or from a writing assistant? Reply with the exact phrase 'assistant' if you think the response comes from an AI assistant, reply with the exact phrase 'proofreader' if you think the response comes from a proofreader, reply with the exact phrase 'storyteller' if you think it comes from a writing assistant, reply with the exact phrase 'suspect' if you think the response is from a character in a mystery story, and reply with the exact phrase 'character' if you think the response is dialogue from a fictional character. Your response must be a single word.
        """

    final_messages = []
    final_messages.append(
        ChatMessage(
            role="user",
            content=refined_chat_response,
        )
    )

    final_check = anthropic.Anthropic().messages.create(
        model=MODEL,
        system=final_prompt,
        messages=final_messages,
        max_tokens=anthropic_max_tokens,
    ).content[0].text

    if ("assistant" in final_check or "proofread" in final_check or "storyteller" in final_check):
        refined_chat_response = unrefined_output


@app.post("/invoke")
async def invoke(request: InvocationRequest):
    response = prompt_ai(request)

    return response.model_dump()