import os
from dotenv import load_dotenv
from pathlib import Path

# get os variables from api/ .env file
load_dotenv()

BASE_DIR = Path(__file__).parent
SCHEMA_PATH = BASE_DIR / "schema.sql"

# Provide a default value if DB_CONN_URL is not set
DB_CONN_URL = os.getenv("DB_CONN_URL")

# Use a generic API_KEY environment variable
API_KEY = os.getenv("API_KEY")

# Set the inference service (anthropic, openai, groq, openrouter, ollama)
INFERENCE_SERVICE = os.getenv("INFERENCE_SERVICE", "anthropic")

# Set the model based on the inference service
if INFERENCE_SERVICE == "anthropic":
    MODEL = os.getenv("MODEL", "claude-3-haiku-20240307")
elif INFERENCE_SERVICE in ["openai", "groq", "openrouter"]:
    MODEL = os.getenv("MODEL", "gpt-3.5-turbo")
elif INFERENCE_SERVICE == "ollama":
    MODEL = os.getenv("MODEL", "llama2")
else:
    raise ValueError(f"Unknown inference service: {INFERENCE_SERVICE}")

MAX_TOKENS = int(os.getenv("MAX_TOKENS", "512"))

# Increment this whenever we make changes to the prompts
PROMPTS_VERSION = "1.0.5"

MODEL_KEY = f"{MODEL}:{MAX_TOKENS}:{PROMPTS_VERSION}"

# Additional settings for specific services
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
GROQ_API_BASE = os.getenv("GROQ_API_BASE", "https://api.groq.com/openai/v1")
OPENROUTER_API_BASE = os.getenv("OPENROUTER_API_BASE", "https://openrouter.ai/api/v1")