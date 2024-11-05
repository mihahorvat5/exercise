import json
from pathlib import Path
from settings import USERS_FILE


users_file_path = Path(USERS_FILE)


if users_file_path.exists():
    with open(users_file_path, "r") as file:
        users = json.load(file)
else:
    users = []


def save_users():
    with open(users_file_path, "w") as file:
        json.dump(users, file, indent=4)
