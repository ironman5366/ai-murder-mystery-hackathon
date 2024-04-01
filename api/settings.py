import os
from dotenv import load_dotenv
from pathlib import Path

# get os variables from web/ .env file
load_dotenv()

BASE_DIR = Path(__file__).parent.parent

SCHEMA_PATH = BASE_DIR / "schema.sql"

DB_CONN_URL = os.environ["DB_CONN_URL"]

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
