import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

BASE_DIR = Path(__file__).parent
SCHEMA_PATH = BASE_DIR / "schema.sql"

DB_CONN_URL = os.getenv("DB_CONN_URL")
API_KEY = os.getenv("API_KEY")

INFERENCE_SERVICE = os.getenv("INFERENCE_SERVICE", "anthropic")

if INFERENCE_SERVICE == "anthropic":
    MODEL = os.getenv("MODEL", "claude-3-haiku-20240307")
elif INFERENCE_SERVICE in ["openai", "groq", "openrouter", "deepseek"]:
    MODEL = os.getenv("MODEL", "deepseek-v4-flash" if INFERENCE_SERVICE == "deepseek" else "gpt-3.5-turbo")
elif INFERENCE_SERVICE == "ollama":
    MODEL = os.getenv("MODEL", "llama2")
else:
    raise ValueError(f"Unknown inference service: {INFERENCE_SERVICE}")

MAX_TOKENS = int(os.getenv("MAX_TOKENS", "512"))

PROMPTS_VERSION = "1.0.5"
MODEL_KEY = f"{MODEL}:{MAX_TOKENS}:{PROMPTS_VERSION}"

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
GROQ_API_BASE = os.getenv("GROQ_API_BASE", "https://api.groq.com/openai/v1")
OPENROUTER_API_BASE = os.getenv("OPENROUTER_API_BASE", "https://openrouter.ai/api/v1")
DEEPSEEK_API_BASE = os.getenv("DEEPSEEK_API_BASE", "https://api.deepseek.com")
