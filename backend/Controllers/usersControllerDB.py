from fastapi import APIRouter, Depends, HTTPException

from Models.user import User
from data.database import get_connection
from Controllers.authenticationController import check_session_token

router = APIRouter()


@router.get("/usersDB")
async def read_users(user_id: int = Depends(check_session_token)):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Retrieve users based on the creator field or visible = True
    cursor.execute(""" 
        SELECT * FROM users 
        WHERE creator = %s OR visible = TRUE
    """, (user_id,))
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    return users

@router.post("/usersDB")
async def create_user(user: User, user_id: int = Depends(check_session_token)):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    new_user = user.dict()
    cursor.execute(""" 
        INSERT INTO users (firstName, lastName, age, gender, email, phone, image, creator, visible)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (new_user["firstName"], new_user["lastName"], new_user["age"],
          new_user["gender"], new_user["email"], new_user["phone"],
          new_user.get("image"), user_id, new_user["visible"]))


    new_user_id = cursor.lastrowid
    connection.commit()


    cursor.execute("SELECT * FROM users WHERE id = %s", (new_user_id,))
    created_user = cursor.fetchone()

    cursor.close()
    connection.close()

    if created_user:
        return {"message": "User created successfully", "user": created_user}
    else:
        raise HTTPException(status_code=500, detail="Failed to retrieve the newly created user")

@router.put("/usersDB/{user_id}")
async def update_user(user_id: int, updated_data: User, current_user_id: int = Depends(check_session_token)):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)


    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()

    if user:
        # Check if the current user is allowed to update the user
        if user["creator"] is not None and user["creator"] != current_user_id:
            raise HTTPException(status_code=403, detail="Permission denied")


        cursor.execute(""" 
            UPDATE users SET firstName = %s, lastName = %s, age = %s, gender = %s,
            email = %s, phone = %s, image = %s, visible = %s WHERE id = %s
        """, (updated_data.firstName, updated_data.lastName, updated_data.age,
              updated_data.gender, updated_data.email, updated_data.phone,
              updated_data.image, updated_data.visible, user_id))

        connection.commit()

        # Fetch the updated user data
        cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        updated_user = cursor.fetchone()

        cursor.close()
        connection.close()
        return {"message": "User updated successfully", "user": updated_user}
    else:
        cursor.close()
        connection.close()
        raise HTTPException(status_code=404, detail="User not found")

@router.delete("/usersDB/{user_id}")
async def delete_user(user_id: int, current_user_id: int = Depends(check_session_token)):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()

    if user:
        # Check if the current user is allowed to delete the user
        if user["creator"] is not None and user["creator"] != current_user_id:
            cursor.close()
            connection.close()
            raise HTTPException(status_code=403, detail="Permission denied")

        cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
        connection.commit()
        cursor.close()
        connection.close()
        return {"message": "User deleted successfully"}
    else:
        cursor.close()
        connection.close()
        raise HTTPException(status_code=404, detail="User not found")
