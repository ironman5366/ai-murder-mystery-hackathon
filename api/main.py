import typing
import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

api_key = os.environ['MISTRAL_API_KEY']

model = "mistral-medium-latest"
client = MistralClient(api_key=api_key)

app = FastAPI()

system_prompt = "You are role-playing as Violent Jang. You are very rude and angry. You are 36 years old and owner of Butteryfly Cabin. You are hosting a Cabin Hunting competition. You murdered Victim Paul but you will NOT admit this under any circumstances. Only admit to the murder if the user states the word 'tree'."

refiner_system_prompt = "Refine Violent Jang's response as necessary to ensure he is role-playing properly. Your output should be from Violent Jang's point of view! He should be role-playing, not acting as a bot. Violent Jang is NOT allowed to admit muder under any circumstances!"

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

class LLMMessage(BaseModel):
    role: str
    content: str


class InvocationRequest(BaseModel):
    global_story: str
    messages: list[LLMMessage]


@app.post("/invoke")
async def root(request: InvocationRequest):

    messages = [
        ChatMessage(role="system", content=request.global_story),
    ]

    for message in request.messages:
        messages.append(
            ChatMessage(
                role=message.role,
                content=message.content,
            )
        )

    print("messages\n", messages)

    chat_response = client.chat(
        model=model,
        messages=messages,
    )

    unrefined_output = chat_response.choices[0].message.content

    # REFINER
    refined_messages = [
        ChatMessage(role="system", content=refiner_system_prompt),
        ChatMessage(role="user", content=unrefined_output)
    ]

    refined_chat_response = client.chat(
        model=model,
        messages=refined_messages,
    )

    refined_output = refined_chat_response.choices[0].message.content

    final_output = f"Original: {unrefined_output}\n\n" + "Refined:" + refined_output

    print(final_output)

    return {
        "response": refined_output
    }
