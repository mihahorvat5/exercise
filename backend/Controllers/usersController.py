from fastapi import APIRouter, Depends, HTTPException

from Models.user import User
from data.users import users, save_users  # Import save_users to persist data
from Controllers.authenticationController import check_session_token

router = APIRouter()


@router.get("/users")
async def read_users(user_id: int = Depends(check_session_token)):
    # Filter users based on the visible field and creator field
    filtered_users = [
        user for user in users if user["visible"] or user["creator"] == user_id
    ]
    return filtered_users

@router.post("/users")
async def create_user(user: User, user_id: int = Depends(check_session_token)):
    # Create a new user with the provided data and set the creator to the logged-in user
    new_user = user.dict()
    new_user["id"] = max(user["id"] for user in users) + 1 if users else 1  # Auto-increment ID
    new_user["creator"] = user_id  # Set the creator as the logged-in user
    users.append(new_user)
    save_users()  # Save the updated users list to file
    return {"message": "User created successfully", "user": new_user}

@router.put("/users/{user_id}")
async def update_user(user_id: int, updated_data: User, current_user_id: int = Depends(check_session_token)):
    # Find the user by ID and ensure the current user has permission to edit
    for user in users:
        if user["id"] == user_id:
            # Only the creator can update this user, and if creator is None, updating is not allowed
            if user["creator"] is None or user["creator"] != current_user_id:
                raise HTTPException(status_code=403, detail="Permission denied")
            
            # Update user fields
            user.update(updated_data.dict(exclude_unset=True))  # Only update provided fields
            save_users()  # Save the updated users list to file
            return {"message": "User updated successfully", "user": user}

    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/users/{user_id}")
async def delete_user(user_id: int, current_user_id: int = Depends(check_session_token)):
    # Find the user by ID and ensure the current user has permission to delete
    for user in users:
        if user["id"] == user_id:
            # Only the creator can delete this user, and if creator is None, deletion is not allowed
            if user["creator"] is None or user["creator"] != current_user_id:
                raise HTTPException(status_code=403, detail="Permission denied")
            
            # Delete user by ID
            users.remove(user)
            save_users()  # Save the updated users list to file
            return {"message": "User deleted successfully"}

    raise HTTPException(status_code=404, detail="User not found")
