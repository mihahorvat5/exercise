# tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from main import app

@pytest.fixture(scope="session")
def client():
    with TestClient(app) as c:
        yield c

@pytest.fixture(scope="session")
def session_token(client):
    # Step 1: Log in to get the session token
    response = client.post("/login", json={"username": "1", "password": "1"})
    assert response.status_code == 200
    assert "session_token" in response.json()
    return response.json()["session_token"]