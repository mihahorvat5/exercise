import json
from data.database import get_connection
from settings import USERS_FILE, REGISTERED_FILE

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
    connection = get_connection()
    cursor = connection.cursor()


    create_tables(cursor)


    with open(USERS_FILE) as f:
        users_data = json.load(f)

    with open(REGISTERED_FILE) as f:
        registered_data = json.load(f)


    seed_users(cursor, users_data)
    seed_registered(cursor, registered_data)


    connection.commit()
    cursor.close()
    connection.close()
    print("Database seeding completed.")

if __name__ == "__main__":
    main()