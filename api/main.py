import typing
import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# get os variables from web/ .env file
load_dotenv()

verbose = True
model_type = "anthropic" # mistral / anthropic / openai

if model_type=="mistral":
    from mistralai.client import MistralClient
    from mistralai.models.chat_completion import ChatMessage
    api_key = os.environ['MISTRAL_API_KEY']
    model = "mistral-large-latest"
    client = MistralClient(api_key=api_key)
elif model_type=="anthropic":
    import anthropic
    def ChatMessage(role="user",content=""):
        return {"role": role, "content": content}
    api_key = os.environ['ANTHROPIC_API_KEY']
    model = "claude-3-haiku-20240307"
    client = anthropic.Anthropic(api_key=api_key)
    anthropic_max_tokens = 512
    
base_system_prompt = "All responses must be less than 50 words long. Make up vivid story details on where and what happened the day of the crime while staying in character."

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

    if model_type=="mistral":
        messages = [
            ChatMessage(role="system", content=base_system_prompt),
            ChatMessage(role="system", content=request.global_story),
            ChatMessage(role="system", content=request.actor.prompt())
        ]
            
    elif model_type=="anthropic":
        system_prompt = base_system_prompt + request.global_story + request.actor.prompt()
        # print("system_prompt\n", system_prompt)
        
        messages = []
        
    for message in request.actor.messages:
        messages.append(
            ChatMessage(
                role=message.role,
                content=message.content,
            )
        )

    if verbose: print("messages\n", messages)
    
    # UNREFINED 
    
    if model_type=="mistral":
        unrefined_output = client.chat(
            model=model,
            messages=messages,
        ).choices[0].message.content
    elif model_type == "anthropic":
        unrefined_output = anthropic.Anthropic().messages.create(
            model=model,
            system=system_prompt,
            messages=messages,
            max_tokens=anthropic_max_tokens,
        ).content[0].text

    if verbose: print(f"Unrefined: {unrefined_output}")

    # CRITIQUER
    
    base_judge_prompt = f"""
    You're helping to proofread copy for a clue-style mystery video game.
    The following response is from the character 
    \"{request.actor.name}\". Their bio is \"{request.actor.bio}\". 
    They're hiding a secret - \"{request.actor.secret}\".    
    """

    critique_prompt = base_judge_prompt + f"""
    You need to make sure their response follows these rules:
    1. Most importantly, IT MUST NOT MENTION the secret they're hiding - \"{request.actor.secret}\".
    2. It should be in-character, and from {request.actor.name}'s point of view.
    3. {request.actor.name}'s response must be less than 50 words in length.
    
    Either identify the issues in the response, or output "no issues" if there are no issues.
    """
    
    if model_type=="mistral":
        critique_messages = [
            ChatMessage(role="system", content=critique_prompt),
            ChatMessage(role="user", content=unrefined_output)
        ]
        
        critique_chat_response = client.chat(
            model=model,
            messages=critique_messages,
        ).choices[0].message.content
        
    elif model_type == "anthropic":
        # print("critique_system_prompt\n", critique_prompt)
        
        critique_messages = [
            ChatMessage(role="user", content=unrefined_output)
        ]
        
        critique_chat_response = anthropic.Anthropic().messages.create(
            model=model,
            system=critique_prompt,
            messages=critique_messages,
            max_tokens=anthropic_max_tokens,
        ).content[0].text

    if verbose: print(f"Critique response: {critique_chat_response}")

    if "no issues" in critique_chat_response:
        return {
            "response": unrefined_output,
            "issues": False,
        }

    # REFINER
    
    refined_prompt = base_judge_prompt + f"""
    The following response has the following problems: {critique_chat_response}.
    Please re-write it to fix it. ONLY OUTPUT THE REWRITTEN RESPONSE, FROM {request.actor.name}'s POINT OF VIEW. THIS
    IS EXTREMELY IMPORTANT!!!.
    """
    
    if model_type=="mistral":
        refined_messages = [
            ChatMessage(role="system", content="Keep responses to 1 to 3 sentences long."),
            ChatMessage(role="system", content=request.global_story),
            ChatMessage(role="system", content=request.actor.prompt()),
            ChatMessage(role="system", content=refined_prompt),
            ChatMessage(role="user", content=unrefined_output)
        ]
        
        refined_chat_response = client.chat(
            model=model,
            messages=refined_messages,
        ).choices[0].message.content
        
    elif model_type == "anthropic":
        # print("refiner_system_prompt\n", system_prompt + refined_prompt)
        
        refined_messages = [
            ChatMessage(role="user", content=unrefined_output)
        ]
        
        refined_chat_response = anthropic.Anthropic().messages.create(
            model=model,
            system=system_prompt + refined_prompt,
            messages=refined_messages,
            max_tokens=anthropic_max_tokens,
        ).content[0].text

    if verbose: print(f"Refined response: {refined_chat_response}")

    return {
        "response": refined_chat_response
    }