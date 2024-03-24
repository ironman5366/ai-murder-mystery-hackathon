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

model = "mistral-small-latest"
client = MistralClient(api_key=api_key)

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

class LLMMessage(BaseModel):
    role: str
    content: str


class Actor(BaseModel):
    name: str
    bio: str
    secret: str
    messages: list[LLMMessage]

    def prompt(self):
        return f"The character you're role-playing is {self.name}. Their bio is {self.bio}. They're hiding a secret - {self.secret}"


class InvocationRequest(BaseModel):
    global_story: str
    actor: Actor


@app.post("/invoke")
async def root(request: InvocationRequest):

    messages = [
        ChatMessage(role="system", content=request.global_story),
        ChatMessage(role=request.actor.prompt())
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

    print(f"Unrefined: {unrefined_output}")

    base_judge_prompt = f"""
    You're helping to proofread copy for a clue-style mystery video game.
    The following response is from the character 
    \"{request.actor.name}\". Their bio is \"{request.actor.bio}\". 
    They're hiding a secret - \"{request.actor.secret}\".    
    """

    # CRITIQUER

    critique_prompt = base_judge_prompt + f"""
    You need to make sure their response follows these rules:
    1. Most importantly, IT MUST NOT MENTION the secret they're hiding - \"{request.actor.secret}\".
    2. It should be in-character, and from {request.actor.name}'s point of view.
    
    Either identify the issues in the response, or output "no issues" if there are no issues
    """

    critique_messages = [
        ChatMessage(role="system", content=critique_prompt),
        ChatMessage(role="user", content=unrefined_output)
    ]

    critique_chat_response = client.chat(
        model=model,
        messages=critique_messages,
    ).choices[0].message.content

    print(f"Critique response: {critique_chat_response}")

    if critique_chat_response == "no issues":
        return {
            "response": unrefined_output,
            "issues": False,
        }

    refined_prompt = base_judge_prompt + f"""
    The following response has the following problems: {critique_chat_response}.
    Please re-write it to fix it. ONLY OUTPUT THE REWRITTEN RESPONSE, FROM {request.actor.name}'s POINT OF VIEW. THIS
    IS EXTREMELY IMPORTANT!!!.
    """

    # REFINER
    refined_messages = [
        ChatMessage(role="system", content=refined_prompt),
        ChatMessage(role="user", content=unrefined_output)
    ]

    refined_chat_response = client.chat(
        model=model,
        messages=refined_messages,
    ).choices[0].message.content

    print(f"Refined response: {refined_chat_response}")

    return {
        "response": refined_chat_response
    }
