# data/database.py
import mysql.connector
from mysql.connector import pooling
import logging
from exceptions import DatabaseNotConnectedException  # Import the custom exception

# Configure logging
logging.basicConfig(level=logging.INFO)

# Attempt to create a connection pool
try:
    connection_pool = pooling.MySQLConnectionPool(
        pool_name="syyclops_pool",
        pool_size=5,  # Adjust as needed
        pool_reset_session=True,
        host="localhost",
        database="syyclops-exam",
        user="root",
        password=""
    )
    logging.info("Database connected successfully.")
except mysql.connector.Error as err:
    logging.error(f"Database connection failed: {err}")
    connection_pool = None  # Set to None if the connection fails

def get_connection():
    if connection_pool is None:
        logging.warning("Cannot get connection: Database not connected.")
        raise DatabaseNotConnectedException()  # Raise the custom exception
    return connection_pool.get_connection()
