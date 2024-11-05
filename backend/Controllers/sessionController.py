# Controllers/sessionController.py
import secrets
import logging

active_sessions = {}  # A dictionary to hold active sessions

# Configure logging
logging.basicConfig(level=logging.INFO)

def create_session(user_id):
    # Generate a new session token
    session_token = secrets.token_hex(16)

    # If the user already has an active session, invalidate the old one
    for token, uid in list(active_sessions.items()):
        if uid == user_id:
            del active_sessions[token]
            logging.info(f"Session updated: {session_token} for user ID: {user_id}")
            break
    else:
        logging.info(f"New session created: {session_token} for user ID: {user_id}")

    # Store the new session token with the user ID
    active_sessions[session_token] = user_id
    return session_token

def check_session(token):
    # Check if the token is valid
    return active_sessions.get(token)

def invalidate_session(token):
    # Invalidate the session token
    if token in active_sessions:
        del active_sessions[token]
