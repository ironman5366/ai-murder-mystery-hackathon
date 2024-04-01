
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from types import InvocationRequest, InvocationResponse
from db import get_conn
from settings import MODEL, MODEL_KEY
from ai import respond_initial, critique, refine, check_whether_to_refine

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


def store_response(turn_id: int, response: InvocationResponse):
    pass


def prompt_ai(request: InvocationRequest) -> InvocationResponse:
    turn_id = create_conversation_turn(request)
    print(f"Serving turn {turn_id}")

    # UNREFINED
    unrefined_response = respond_initial(turn_id, request)
    critique_response = critique(turn_id, request, unrefined_response)
    problems_found = check_whether_to_refine(critique_response)

    if problems_found:
        refined_response = refine(turn_id, request, critique_response, unrefined_response)
        final_response = refined_response
    else:
        final_response = unrefined_response
        refined_response = None

    response = InvocationResponse(
        original_response=unrefined_response,
        critique_response=critique_response,
        problems_detected=problems_found,
        final_response=final_response,
        refined_response=refined_response,
    )
    store_response(turn_id, response)

    return response



@app.post("/invoke")
async def invoke(request: InvocationRequest):
    response = prompt_ai(request)

    return response.model_dump()