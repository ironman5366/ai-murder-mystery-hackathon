import time
from datetime import datetime, timezone
from invoke_types import InvocationRequest, Actor, LLMMessage
from settings import MODEL, MODEL_KEY, MAX_TOKENS
import json
import anthropic

# NOTE: increment PROMPT_VERSION if you make ANY changes to these prompts

def get_actor_prompt(actor: Actor):
    return (f"You are {actor.name} talking to the user, Detective Sheerluck. "
            f"All your outputs need to be dialogue responses and must be less than 60 words long. "
            f"Stay true to the story background, talk in character, and make up vivid story details if unspecified. "
            f"Your personality that should be apparent in all messages is: {actor.personality} "
            f"{actor.context} {actor.secret}")


def get_system_prompt(request: InvocationRequest):
    return request.global_story + (" The user is Detective Sheerluck, who aims to find Victim Cho's body and "
                                   "uncover the person responsible for his disappearance. The previous text is "
                                   "the background to this story.") + get_actor_prompt(request.actor)




def invoke_ai(conn,
              turn_id: int,
              prompt_role: str,
              system_prompt: str,
              messages: list[LLMMessage],):

    with conn.cursor() as cur:
        start_time = datetime.now(tz=timezone.utc)
        serialized_messages = [msg.model_dump() for msg in messages]

        response = anthropic.Anthropic().messages.create(
            model=MODEL,
            system=system_prompt,
            messages=serialized_messages,
            max_tokens=MAX_TOKENS,
        ).content[0].text

        finish_time = datetime.now(tz=timezone.utc)

        cur.execute(
            "INSERT INTO ai_invocations(conversation_turn_id, prompt_role, model, model_key, prompt_messages, response, started_at, finished_at) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (turn_id, prompt_role, MODEL, MODEL_KEY, json.dumps(serialized_messages), response,
             start_time.isoformat(), finish_time.isoformat(), )
        )

    return response


def respond_initial(conn, turn_id: int,
                           request: InvocationRequest):
    return invoke_ai(
        conn,
        turn_id,
        "initial",
        system_prompt=get_system_prompt(request),
        messages=request.actor.messages
    )


def get_critique_prompt(
        request: InvocationRequest
):
    return f"""
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


def critique(conn, turn_id: int, request: InvocationRequest, unrefined: str) -> str:
   return invoke_ai(
       conn,
       turn_id,
       "critique",
       system_prompt=get_critique_prompt(request),
       messages=[LLMMessage(role="user", content=f"<dialogue>{unrefined}</dialogue>")]
   )


def check_whether_to_refine(critique_chat_response: str) -> bool:
    """
    Returns a boolean indicating whether the chat response should be refined.
    """
    # TODO: make this more sophisticated. Function calling with # of problems, maybe?
    return "There are no issues!" not in critique_chat_response


def get_refiner_prompt(request: InvocationRequest,
                       critique_response: str):
    original_message = request.actor.messages[-1].content

    return f"""
        Your job is to edit conversation for a murder mystery video game. This dialogue comes from the character {request.actor.name} in response to the following prompt: {original_message}.

        Here is story background specific to {request.actor.name}: {request.actor.context} {request.actor.secret}

        Your revised dialogue MUST be less than 60 words long, consistent with the story background, and free of the following problems: {critique_response}.

        Your output revised conversational dialogue must be as identical as possible to the original user message and consistent with the following personality: {request.actor.personality}. Make as few changes as possible to the original input!

        NO QUOTATION MARKS ALLOWED. NO COMMENTARY ON STORY CONSISTENCY OR CRITICISMS.
        """


def refine(conn, turn_id: int, request: InvocationRequest, critique_response: str, unrefined_response: str):
    return invoke_ai(
        conn,
        turn_id,
        "refine",
        system_prompt=get_critique_prompt(critique_response),
        messages=request.actor.messages + [
            LLMMessage(
                role="user",
                content=unrefined_response
            )
        ]
    )

