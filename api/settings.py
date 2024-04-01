import os

from dotenv import load_dotenv
from pathlib import Path

# get os variables from api/ .env file
load_dotenv()

BASE_DIR = Path(__file__).parent

SCHEMA_PATH = BASE_DIR / "schema.sql"

DB_CONN_URL = os.environ["DB_CONN_URL"]

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]

MODEL = "claude-3-haiku-20240307"
MAX_TOKENS = 512

# Increment this whenever we make changes to the prompts
PROMPTS_VERSION = "1.0.0"

MODEL_KEY = f"{MODEL}:{MAX_TOKENS}:{PROMPTS_VERSION}"

