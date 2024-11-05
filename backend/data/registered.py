import json
from pathlib import Path
from settings import REGISTERED_FILE

registered_file_path = Path(REGISTERED_FILE)


if registered_file_path.exists():
    with open(registered_file_path, "r") as file:
        registered_users = json.load(file)
else:
    registered_users = []
