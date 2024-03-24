import typing
import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

load_dotenv()

api_key = os.environ['MISTRAL_API_KEY']

model = "mistral-medium-latest"
client = MistralClient(api_key=api_key)

app = FastAPI()




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
        messages.append(ChatMessage(role=message.role, content=message.content))

    print("messages\n", messages)

    chat_response = client.chat(
        model=model,
        messages=messages,
    )

    print(chat_response)

    return {
        "response": chat_response
    }
