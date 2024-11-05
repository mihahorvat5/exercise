------------------------------------- SETUP GUIDE -------------------------------------

BACKEND SETUP
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt

TO USE MYSQL DATABASE (optional):
-download wampserver
-run wampserver
-http://localhost/phpmyadmin/  (i think default is username:"root" password:"", i left it like this in backend files aswell)
-create new database named syyclops-exam (preferrably with slovenian language, tested 100% working with utf8mb4_slovenian_ci and utf8mb3_slovenian_ci)
python seeder.py  (will give "Error connecting to MySQL database: unknown database 'syyclops-exam' if the database is not set up correctly, if all is good it will give you success messages in terminal!)
!!database is NOT NEEDED for functionality of the app, its additional feature! in case there is no database the app will work normally (but the login via database and users from database will not work/be displayed) - (watch out at login page since it works with the checkbox from sidebar aswell, if no database is connected leave it OFF otherwise you will not be able to login)

RUN BACKEND VIA
fastapi dev main.py



TESTING THE BACKEND
.venv\Scripts\Activate.ps1
$env:PYTHONWARNINGS = "ignore::UserWarning"; python -m pytest -v  (if database is connected it should give all the PASSED messages:

collected 19 items

tests/test_authentication_controller.py::test_login_db_success PASSED                                                                                              [  5%] 
tests/test_authentication_controller.py::test_login_db_invalid_credentials PASSED                                                                                  [ 10%]
tests/test_authentication_controller_db.py::test_login_db_success PASSED                                                                                           [ 15%] 
tests/test_authentication_controller_db.py::test_login_db_invalid_credentials PASSED                                                                               [ 21%] 
tests/test_database.py::test_connection_pool_initialization PASSED                                                                                                 [ 26%] 
tests/test_database.py::test_get_connection PASSED                                                                                                                 [ 31%] 
tests/test_main.py::test_read_root PASSED                                                                                                                          [ 36%] 
tests/test_session_controller.py::test_create_session PASSED                                                                                                       [ 42%] 
tests/test_session_controller.py::test_invalidate_session PASSED                                                                                                   [ 47%] 
tests/test_users_controller.py::test_read_users PASSED                                                                                                             [ 52%] 
tests/test_users_controller.py::test_create_user PASSED                                                                                                            [ 57%] 
tests/test_users_controller.py::test_update_user PASSED                                                                                                            [ 63%] 
tests/test_users_controller.py::test_delete_user PASSED                                                                                                            [ 68%] 
tests/test_users_controller.py::test_read_users_invalid_token PASSED                                                                                               [ 73%] 
tests/test_users_controller_db.py::test_read_users_db PASSED                                                                                                       [ 78%] 
tests/test_users_controller_db.py::test_create_user_db PASSED                                                                                                      [ 84%] 
tests/test_users_controller_db.py::test_update_user_db PASSED                                                                                                      [ 89%] 
tests/test_users_controller_db.py::test_delete_user_db PASSED                                                                                                      [ 94%] 
tests/test_users_controller_db.py::test_read_users_db_invalid_token PASSED                                                                                         [100%] 

========================================================================== 19 passed in 0.12s ===========================================================================


if database is not connected it should give FAIL messages for all the methods that use the database:


collected 19 items

tests/test_authentication_controller.py::test_login_db_success FAILED                                                                                              [  5%]
tests/test_authentication_controller.py::test_login_db_invalid_credentials FAILED                                                                                  [ 10%] 
tests/test_authentication_controller_db.py::test_login_db_success FAILED                                                                                           [ 15%] 
tests/test_authentication_controller_db.py::test_login_db_invalid_credentials FAILED                                                                               [ 21%]
tests/test_database.py::test_connection_pool_initialization FAILED                                                                                                 [ 26%] 
tests/test_database.py::test_get_connection PASSED                                                                                                                 [ 31%] 
tests/test_main.py::test_read_root PASSED                                                                                                                          [ 36%] 
tests/test_session_controller.py::test_create_session PASSED                                                                                                       [ 42%] 
tests/test_session_controller.py::test_invalidate_session PASSED                                                                                                   [ 47%] 
tests/test_users_controller.py::test_read_users PASSED                                                                                                             [ 52%] 
tests/test_users_controller.py::test_create_user PASSED                                                                                                            [ 57%]
tests/test_users_controller.py::test_update_user PASSED                                                                                                            [ 63%] 
tests/test_users_controller.py::test_delete_user PASSED                                                                                                            [ 68%] 
tests/test_users_controller.py::test_read_users_invalid_token PASSED                                                                                               [ 73%] 
tests/test_users_controller_db.py::test_read_users_db FAILED                                                                                                       [ 78%]
tests/test_users_controller_db.py::test_create_user_db FAILED                                                                                                      [ 84%] 
tests/test_users_controller_db.py::test_update_user_db FAILED                                                                                                      [ 89%] 
tests/test_users_controller_db.py::test_delete_user_db FAILED                                                                                                      [ 94%] 
tests/test_users_controller_db.py::test_read_users_db_invalid_token PASSED                                                                                         [100%] 

=============================================================================== FAILURES ===============================================================================



FRONTEND SETUP
npm i

RUN FRONTEND VIA
npm run start


----------------------------------- SETUP GUIDE END -----------------------------------


Welcome to test assignment for Syyclops.

This test is split into 2 sections, React and Python.

# Frontend
Go to `frontend` folder and run:
- `npm i`
- `npm run start`

This will open the project in http://localhost:3000/

Preferrably you can use https://tailwindcss.com for styling elements, but feel free to use your own CSS as well if you are not familiar with tailwind.

# Frontend assignment
You will be using a fake JSON response service called DummyJSON - https://dummyjson.com/docs/users. For fetching data you can add [axios](https://axios-http.com/docs/intro) or any other http library.
- Develop a page which is split into 2 sections: sidebar and main content
- In the sidebar list 20 users (in the docs you should find how to limit number of users)
- In the main content section, display the currently selected user (each user in sidebar should be clickable)
  - Show these fields:
    - "id", "firstName", "lastName" "age", "gender", "email", "phone"
- **Bonus**
  - When user is selected, implement an "Edit functionality", where all of the displayed fields are input and you can change their values. Call the appropriate endpoint (https://dummyjson.com/docs/users#users-update) and update the view with the response from the endpoint
- **Bonus 2**
  - Try to match the https://syyclops.com visual identity (colors, logo, etc...)


# Backend assignment
First, you need to create a virtual environment - https://fastapi.tiangolo.com/virtual-environments/

Once you are done, install the required packages:

```
pip install "fastapi[standard]"
```

After this, you can run the server with:

```
fastapi dev main.py
```

Your server should be available at http://127.0.0.1:8000

## Backend tasks

- Create an endpoint which lists the users same way as DummyJSON does
  - Endpoint should be available on `/users`
- Create an `PUT` endpoint, where you can edit specific user based on id. You can find list of users in `users.py` file.
- **Bonus**
  - Connect React app to use newly created python endpoints instead of DummyJSON
- **Bonus 2**
  - Write tests to ensure everything works properly

If you need help contact me at jan@syyclops.com or anthony.demattos@syyclops.com.
