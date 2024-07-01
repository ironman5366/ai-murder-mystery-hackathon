import time
from datetime import datetime, timezone
from invoke_types import InvocationRequest, Actor, LLMMessage
from settings import MODEL, MODEL_KEY, MAX_TOKENS
import json
import anthropic

# NOTE: increment PROMPT_VERSION if you make ANY changes to these prompts

def get_actor_prompt(actor: Actor):
    return (f"You are {actor.name} talking to Detective Sheerluck. "
            f"Your outputs need to be dialogue responses. "
            f"Stay true to the story background, talk in character, and create your own vivid story details if unspecified. "
            f"Give elaborate visual descriptions of past events and relationships amongst other people. "
            f"Your personality that should be apparent in all messages is: {actor.personality} "
            f"{actor.context} {actor.secret}")


def get_system_prompt(request: InvocationRequest):
    return request.global_story + (" Detective Sheerluck is interrogating suspects to find Victim Cho's killer. The previous text is the background to this story.") + get_actor_prompt(request.actor)


def invoke_ai(conn,
              turn_id: int,
              prompt_role: str,
              system_prompt: str,
              messages: list[LLMMessage],):

    with conn.cursor() as cur:
        start_time = datetime.now(tz=timezone.utc)
        serialized_messages = [msg.model_dump() for msg in messages]

        anthropic_response = anthropic.Anthropic().messages.create(
            model=MODEL,
            system=system_prompt,
            messages=serialized_messages,
            max_tokens=MAX_TOKENS,
        )

        input_tokens = anthropic_response.usage.input_tokens
        output_tokens = anthropic_response.usage.output_tokens
        total_tokens = input_tokens + output_tokens

        text_response = anthropic_response.content[0].text

        finish_time = datetime.now(tz=timezone.utc)

        cur.execute(
            "INSERT INTO ai_invocations(conversation_turn_id, prompt_role, model, model_key, prompt_messages, system_prompt, response, started_at, finished_at, input_tokens, output_tokens, total_tokens) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (turn_id, prompt_role, MODEL, MODEL_KEY, json.dumps(serialized_messages), system_prompt, text_response,
             start_time.isoformat(), finish_time.isoformat(), input_tokens, output_tokens, total_tokens)
        )

    return text_response


def respond_initial(conn, turn_id: int,
                           request: InvocationRequest):

    print(f"\nrequest.actor.messages {request.actor.messages}")

    return invoke_ai(
        conn,
        turn_id,
        "initial",
        system_prompt=get_system_prompt(request),
        messages=request.actor.messages,
    )


def get_critique_prompt(
        request: InvocationRequest,
        last_utterance: str
):
    return f"""
        Examine {request.actor.name}'s last utterance: "{last_utterance}" for severe violations of these principles: Principle A: Talking about an AI assistant. {request.actor.violation} END OF PRINCIPLES.
        Focus exclusively on the last utterance and do not consider previous parts of the dialogue. 
        Identify clear and obvious violations of the preceding principles. Off-topic conversation is allowed.
        You can ONLY reference the aforementioned principles. Do not focus on anything else. 
        Provide a concise less than 100 words explanation, quoting directly from the last utterance to illustrate each violation.  
        Think step by step before listing the principles violated. Return the exact one-word phrase "NONE!" and nothing else if no principles are violated. 
        Otherwise, after your analysis, you must list the violated principles according to the following format:
        Format: QUOTE: ... CRITIQUE: ... PRINCIPLES VIOLATED: ...
        Example of this format: QUOTE: "{request.actor.name} is saying nice things." CRITIQUE: The utterance is in 3rd person perspective. PRINCIPLES VIOLATED: Principle 2: Dialogue not in the POV of {request.actor.name}.
    """


def critique(conn, turn_id: int, request: InvocationRequest, unrefined: str) -> str:
   return invoke_ai(
       conn,
       turn_id,
       "critique",
       system_prompt=get_critique_prompt(request,unrefined),
       messages=[LLMMessage(role="user", content=unrefined)]
   )


def check_whether_to_refine(critique_chat_response: str) -> bool:
    """
    Returns a boolean indicating whether the chat response should be refined.
    """
    # TODO: make this more sophisticated. Function calling with # of problems, maybe?
    return critique_chat_response[:4]!="NONE"


def get_refiner_prompt(request: InvocationRequest,
                       critique_response: str):
    original_message = request.actor.messages[-1].content

    refine_out = f"""
        Your job is to edit conversation for a murder mystery video game. This dialogue comes from the character {request.actor.name} in response to the following prompt: {original_message} 
        Here is story background for {request.actor.name}: {request.actor.context} {request.actor.secret} 
        Your revised dialogue must be consistent with the story background and free of the following problems: {critique_response}.
        Your output revised conversational dialogue must be from {request.actor.name}'s perspective and be as identical as possible to the original user message and consistent with {request.actor.name}'s personality: {request.actor.personality}. 
        Make as few changes as possible to the original input! 
        Omit any of the following in your output: quotation marks, commentary on story consistency, mentioning principles or violations.
        """

    return refine_out


def refine(conn, turn_id: int, request: InvocationRequest, critique_response: str, unrefined_response: str):
    return invoke_ai(
        conn,
        turn_id,
        "refine",
        system_prompt=get_refiner_prompt(request, critique_response),
        messages=[
            LLMMessage(
                role="user",
                content=unrefined_response,
            )
        ]
    )

