import os

from dotenv import load_dotenv
from pathlib import Path

# get os variables from api/ .env file
load_dotenv()

BASE_DIR = Path(__file__).parent

SCHEMA_PATH = BASE_DIR / "schema.sql"

# Provide a default value if DB_CONN_URL is not set
DB_CONN_URL = os.getenv("DB_CONN_URL")

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]

MODEL = "claude-3-haiku-20240307"
# MODEL = "claude-3-sonnet-20240229"
# MODEL = "claude-3-opus-20240229"
# MODEL = "claude-3-5-sonnet-20240620"
MAX_TOKENS = 512

# Increment this whenever we make changes to the prompts
PROMPTS_VERSION = "1.0.5"

MODEL_KEY = f"{MODEL}:{MAX_TOKENS}:{PROMPTS_VERSION}"

