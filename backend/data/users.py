import json
from pathlib import Path

# Path to the JSON file
users_file_path = Path("data/users.json")

# Load users from the JSON file
if users_file_path.exists():
    with open(users_file_path, "r") as file:
        users = json.load(file)
else:
    users = []

# Function to save users to the JSON file
def save_users():
    with open(users_file_path, "w") as file:
        json.dump(users, file, indent=4)
