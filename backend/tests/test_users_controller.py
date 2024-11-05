# tests/test_user_controller.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# Store the user ID for later use
created_user_id = None


def test_read_users(client, session_token):
    response = client.get("/users", headers={"Authorization": f"Bearer {session_token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Ensure the response is a list


def test_create_user(client, session_token):
    global created_user_id  # Use the global variable to store the user ID
    
    user_data = {
        "firstName": "Test",
        "lastName": "Test",
        "age": 30,
        "gender": "Test",
        "email": "test@example.com",
        "phone": "1234567890",
        "image": None,
        "visible": True
    }
    
    response = client.post("/users", json=user_data, headers={"Authorization": f"Bearer {session_token}"})
    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"
    
    created_user_id = response.json()["user"]["id"]  # Capture the ID of the created user

    # Verify the user was created by checking the user list
    response = client.get("/users", headers={"Authorization": f"Bearer {session_token}"})
    users_list = response.json()
    assert any(user["id"] == created_user_id for user in users_list), "Created user should be in the users list"

def test_update_user(client, session_token):
    global created_user_id  # Use the global variable to access the user ID
    
    assert created_user_id is not None, "User must be created before it can be updated."

    updated_user_data = {
        "firstName": "Updated",
        "lastName": "Updated",
        "age": 31,
        "gender": "Updated",
        "email": "updated@example.com",
        "phone": "0987654321",
        "image": None,
        "visible": True
    }
    
    response = client.put(f"/users/{created_user_id}", json=updated_user_data, headers={"Authorization": f"Bearer {session_token}"})
    assert response.status_code == 200
    assert response.json()["message"] == "User updated successfully"

    # Verify the user was updated
    updated_user_response = client.get("/users", headers={"Authorization": f"Bearer {session_token}"})
    updated_users = updated_user_response.json()
    updated_user = next(user for user in updated_users if user["id"] == created_user_id)
    assert updated_user["firstName"] == "Updated"  # Verify the updated user's details

def test_delete_user(client, session_token):
    global created_user_id  # Use the global variable to access the user ID
    
    assert created_user_id is not None, "User must be created before it can be deleted."

    response = client.delete(f"/users/{created_user_id}", headers={"Authorization": f"Bearer {session_token}"})
    assert response.status_code == 200
    assert response.json()["message"] == "User deleted successfully"

    # Verify the user is no longer in the database
    final_response = client.get("/users", headers={"Authorization": f"Bearer {session_token}"})
    final_users = final_response.json()
    assert not any(user["id"] == created_user_id for user in final_users), "Deleted user should not be in the users list"


def test_read_users_invalid_token(client, session_token):
    response = client.get("/users", headers={"Authorization": f"Bearer invalid"})
    assert response.status_code == 401
    assert response.json() == {"detail": "Unauthorized: Invalid token"}
