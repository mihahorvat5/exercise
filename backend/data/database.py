import mysql.connector
from mysql.connector import pooling
import logging
from exceptions import DatabaseNotConnectedException
from settings import DB_CONFIG


logging.basicConfig(level=logging.INFO)


try:
    connection_pool = pooling.MySQLConnectionPool(
        pool_name=DB_CONFIG["pool_name"],
        pool_size=DB_CONFIG["pool_size"],
        pool_reset_session=True,
        host=DB_CONFIG["host"],
        database=DB_CONFIG["database"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"]
    )
    logging.info("Database connected successfully.")
except mysql.connector.Error as err:
    logging.error(f"Database connection failed: {err}")
    connection_pool = None

def get_connection():
    if connection_pool is None:
        logging.warning("Cannot get connection: Database not connected.")
        raise DatabaseNotConnectedException()  # Raise the custom exception
    return connection_pool.get_connection()
