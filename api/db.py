from functools import cache

import psycopg
from psycopg.rows import dict_row
from settings import DB_CONN_URL, SCHEMA_PATH
from pathlib import Path
from psycopg_pool import ConnectionPool


@cache
def pool():
    return ConnectionPool(DB_CONN_URL)


def initialize():
    # who needs a migration framework when u have a db.py? not me
    with pool().connection() as conn:
        with conn.cursor() as cursor:
            print("Executing ", SCHEMA_PATH)
            cursor.execute(SCHEMA_PATH.read_text())
        conn.commit()

initialize()