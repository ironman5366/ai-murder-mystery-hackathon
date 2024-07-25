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
    if DB_CONN_URL:
        return ConnectionPool(DB_CONN_URL, check=ConnectionPool.check_connection)
    return None

def initialize():
    if not DB_CONN_URL:
        logging.info("DB_CONN_URL is not defined. Skipping database initialization.")
        return
    
    conn_pool = pool()
    if conn_pool is None:
        logging.info("Connection pool is not available. Skipping database initialization.")
        return
    
    with conn_pool.connection() as conn:
        with conn.cursor() as cursor:
            print("Executing ", SCHEMA_PATH)
            cursor.execute(SCHEMA_PATH.read_text())
        conn.commit()

initialize()
