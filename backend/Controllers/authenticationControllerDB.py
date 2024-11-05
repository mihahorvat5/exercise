from fastapi import APIRouter, HTTPException, Request

from Models.auth import LoginRequest
from data.database import get_connection
from Controllers.sessionController import create_session, check_session
import logging

router = APIRouter()


@router.post("/loginDB")
async def login_db(login_request: LoginRequest):
    # Validate credentials against the MySQL database
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM registered WHERE username = %s", (login_request.username,))
        user = cursor.fetchone()

        if user and user['password'] == login_request.password:
            # Create or update the session
            session_token = create_session(user["id"])
            return {"session_token": session_token}

        raise HTTPException(status_code=401, detail="Invalid credentials")

    finally:
        cursor.close()
        connection.close()

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
    

    return user_id