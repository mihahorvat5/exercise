# Controllers/authenticationController.py
from fastapi import APIRouter, HTTPException, Request

from Models.auth import LoginRequest
from data.registered import registered_users
from Controllers.sessionController import create_session, check_session  # Updated import
import logging

router = APIRouter()


@router.post("/login")
async def login(login_request: LoginRequest):
    # Validate credentials
    for user in registered_users:
        if user["username"] == login_request.username and user["password"] == login_request.password:
            # Create or update the session
            session_token = create_session(user["id"])
            return {"session_token": session_token}

    raise HTTPException(status_code=401, detail="Invalid credentials")

# Middleware to check session token
async def check_session_token(request: Request):
    # Get the session token from the Authorization header
    session_token = request.headers.get('Authorization')

    if not session_token:
        raise HTTPException(status_code=401, detail="Unauthorized: Missing token")
    
    # Expect the token in the format "Bearer <token>"
    if not session_token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized: Invalid token format")
    
    # Extract the actual token
    token = session_token.split(" ")[1]

    # Check if the token is valid
    user_id = check_session(token)
    if user_id is None:
        raise HTTPException(status_code=401, detail="Unauthorized: Invalid token")
    
    # Return the user ID associated with the session token
    return user_id  # Return the user ID associated with the token
