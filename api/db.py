from functools import cache

import psycopg
from psycopg.rows import dict_row
from settings import DB_CONN_URL, SCHEMA_PATH
from pathlib import Path


@cache
def get_conn():
    return psycopg.connect(DB_CONN_URL, row_factory=dict_row)


def initialize():
    # who needs a migration framework when u have a db.py? not me
    cursor = get_conn().cursor()
    # cursor.execute(SCHEMA_PATH.read_text())
