import mysql.connector
import json

# Database configuration
DB_CONFIG = {
    "host": "localhost",
    "user": "root",  # Replace with your MySQL username
    "password": "",  # Replace with your MySQL password
    "database": "syyclops-exam"
}

# File paths for the JSON data
USERS_FILE = 'data/users.json'
REGISTERED_FILE = 'data/registered.json'

def connect_db():
    """Connect to the MySQL database."""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            print("Connected to MySQL database.")
        return connection
    except mysql.connector.Error as e:
        print("Error connecting to MySQL database:", e)
        exit(1)

def create_tables(cursor):
    """Create tables for `users` and `registered`."""
    # Drop tables if they already exist
    cursor.execute("DROP TABLE IF EXISTS users")
    cursor.execute("DROP TABLE IF EXISTS registered")

    # Create `users` table with the visible column and auto-increment for id
    cursor.execute(""" 
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,  -- Setting id to AUTO_INCREMENT
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        age INT,
        gender VARCHAR(10),
        email VARCHAR(100),
        phone VARCHAR(20),
        image TEXT,
        creator INT,
        visible BOOLEAN DEFAULT FALSE  -- Adding the visible field
    )
    """)

    # Create `registered` table
    cursor.execute("""
    CREATE TABLE registered (
        id INT AUTO_INCREMENT PRIMARY KEY,  -- Set id to AUTO_INCREMENT
        username VARCHAR(100),
        password VARCHAR(100)
    )
    """)

    print("Tables created successfully.")

def seed_users(cursor, users_data):
    """Insert data into the `users` table."""
    for user in users_data:
        cursor.execute("""
            INSERT INTO users (firstName, lastName, age, gender, email, phone, image, creator, visible)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            user["firstName"], user["lastName"], user["age"],
            user["gender"], user["email"], user["phone"],
            user.get("image"), user["creator"],
            user.get("visible", False)  # Use False if not provided
        ))

    print("Users table seeded successfully.")

def seed_registered(cursor, registered_data):
    """Insert data into the `registered` table."""
    for user in registered_data:
        cursor.execute("""
            INSERT INTO registered (username, password)  -- Removed id
            VALUES (%s, %s)
        """, (user["username"], user["password"]))

    print("Registered table seeded successfully.")

def main():
    """Main function to run the seeder."""
    connection = connect_db()
    cursor = connection.cursor()

    # Create tables
    create_tables(cursor)

    # Load JSON data
    with open(USERS_FILE) as f:
        users_data = json.load(f)

    with open(REGISTERED_FILE) as f:
        registered_data = json.load(f)

    # Seed data
    seed_users(cursor, users_data)
    seed_registered(cursor, registered_data)

    # Commit changes and close connection
    connection.commit()
    cursor.close()
    connection.close()
    print("Database seeding completed.")

if __name__ == "__main__":
    main()
