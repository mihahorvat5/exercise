from fastapi import APIRouter, HTTPException, Request, Depends
from Models.auth import LoginRequest
from data.registered import registered_users
from Controllers.sessionController import create_session, check_session
import logging

router = APIRouter()

@router.post("/login")
async def login(login_request: LoginRequest):
    """Handle user login by checking credentials and creating a session."""
    # Check user credentials
    for user in registered_users:
        if user["username"] == login_request.username and user["password"] == login_request.password:
            # Create or update the session
            session_token = create_session(user["id"])
            return {"session_token": session_token}

    # Raise HTTP 401 if credentials are invalid
    raise HTTPException(status_code=401, detail="Invalid credentials")

# Middleware to check session token
async def check_session_token(request: Request):
    """Middleware to validate session token in the Authorization header."""
    # Retrieve session token from Authorization header
    session_token = request.headers.get("Authorization")


    if not session_token:
        raise HTTPException(status_code=401, detail="Unauthorized: Missing token")
    
    # Expect the token in the format "Bearer <token>"
    if not session_token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized: Invalid token format")
    
    # Extract the actual token from the header
    token = session_token.split(" ")[1]


    user_id = check_session(token)
    if user_id is None:
        raise HTTPException(status_code=401, detail="Unauthorized: Invalid token")
    

    return user_id  # User ID for the validated session
