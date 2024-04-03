import logging
from functools import cache

from settings import DB_CONN_URL, SCHEMA_PATH
from psycopg_pool import ConnectionPool


logging.basicConfig(
    level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s"
)
logging.getLogger("psycopg.pool").setLevel(logging.INFO)

@cache
def pool():
    return ConnectionPool(DB_CONN_URL, check=ConnectionPool.check_connection)


def initialize():
    # who needs a migration framework when u have a db.py? not me
    with pool().connection() as conn:
        with conn.cursor() as cursor:
            print("Executing ", SCHEMA_PATH)
            cursor.execute(SCHEMA_PATH.read_text())
        conn.commit()

initialize()