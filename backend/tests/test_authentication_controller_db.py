import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

@pytest.fixture
def mock_user():
    # Mock user credentials
    return {"username": "1", "password": "1"}

def test_login_db_success(mock_user):
    response = client.post("/loginDB", json=mock_user)
    assert response.status_code == 200
    assert "session_token" in response.json()

def test_login_db_invalid_credentials():
    response = client.post("/loginDB", json={"username": "invalid", "password": "invalid"})
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid credentials"}
