# tests/test_session_controller.py
from Controllers.sessionController import create_session, check_session, invalidate_session

def test_create_session():
    user_id = 1
    token = create_session(user_id)
    assert token is not None
    assert check_session(token) == user_id

def test_invalidate_session():
    user_id = 1
    token = create_session(user_id)
    invalidate_session(token)
    assert check_session(token) is None
