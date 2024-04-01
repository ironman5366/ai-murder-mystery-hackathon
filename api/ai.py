import time
from datetime import datetime, timezone
from types import InvocationRequest, Actor, LLMMessage
from db import get_conn
from settings import MODEL, MODEL_KEY, MAX_TOKENS
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
                                   "the background to this story.") + request.actor.prompt()


def invoke_ai(conversation_id: int,
              prompt_role: str,
              system_prompt: str,
              messages: list[LLMMessage],):
    conn = get_conn()
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
            "INSERT INTO ai_invocations(conversation_turn_id, model, model_key, prompt_messages, response, started_at, finished_at) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s)",
            conversation_id, MODEL, MODEL_KEY, serialized_messages, response, start_time.isoformat(), finish_time.isoformat()
        )

    return response
