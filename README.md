
# Syyclops Test Assignment - tasks overview

The assignment consists of all the necessary tasks, all the bonuses and some extras i added in to further improve the project. Here i will shortly explain how each thing works:
- **Site is fully responsive and funcional on mobile and desktop devices!**
- **Sidebar**: is accessible via hamburger menu on top right. For non logged users it contains data from DummyJSON. For logged users they can select if they want to use data from MySQL database or from JSON stored on backend via checkbox in sidebar!
- **Sidebar data (user cards)**: are clickable in sidebar, each click will open you "main content" page which will allow the user (non logged and logged) to manipulate with data - editing and deleting! **Its also important to keep in mind that each logged user can only see the user cards he made, or the ones that are made public by it's creator**
- **Login**: Can be done via authentication using MySQL database, or via JSON stored data on backend! (login screen does not have the same layout as other screens, so it is important to select what method you want to use before going there. It works, try it out :D)
- **Add user**: by clicking on Add User in header you will be shown a form which will let you add users to desired destination. This feature works only for logged users, since it actually saves all the data on MySQL or JSON on backend, depending what you have selected! Test it out :D
- **Home screen**: is accessible via Home button in header shows brief instructions on the right div (left one is for aesthetics only, the buttons do nothing as of now)
- **Some useful information**: if you seeded the database with my seeder correctly you should have some login credentials ready for use, but you can always add more, either directly in MySQL or JSON (depending what you want to login with) - for credentials check the file in backend **backend/data/registered.json** or via **http://localhost/phpmyadmin/** if you set up the database

---

## SETUP GUIDE

### BACKEND SETUP
1. Create a virtual environment and activate it:
   ```bash
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   ```
2. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### OPTIONAL: MYSQL DATABASE SETUP
1. Download and install **Wampserver**.
2. Start Wampserver.
3. Go to [phpMyAdmin](http://localhost/phpmyadmin/). (The default credentials are usually `username: "root"` and `password: ""`—the backend is set to these credentials by default.)
4. Create a new database named **syyclops-exam**. Recommended collation for compatibility is **utf8mb4_slovenian_ci** or **utf8mb3_slovenian_ci**.
5. In case you want to change any settings (you use different password or username, or you want to have different database name) go to `settings.py` and change desired info!
6. Run the seeder script to populate the database:
   ```bash
   python seeder.py
   ```
   - If successful, you’ll see success messages in the terminal. If there’s an error like "Error connecting to MySQL database: unknown database 'syyclops-exam'," ensure the database is set up correctly.

> **Note**: The database is **not required** for the app’s functionality. If it’s not connected, the app will still work, but login and user display functionalities dependent on the database will not work. In the login page, ensure the **Database** checkbox in the sidebar is **OFF** if the database is not connected.

### RUNNING THE BACKEND
To start the backend server, use:
```bash
fastapi dev main.py
```

### TESTING THE BACKEND
1. Activate the virtual environment:
   ```bash
   .venv\Scripts\Activate.ps1
   ```
2. Run tests with:
   ```bash
   $env:PYTHONWARNINGS = "ignore::UserWarning"; python -m pytest -v
   ```
   - If the database is connected, you should see all tests passing:
     ```
     collected 19 items

     tests/test_authentication_controller.py::test_login_db_success PASSED
     tests/test_authentication_controller.py::test_login_db_invalid_credentials PASSED
     tests/test_authentication_controller_db.py::test_login_db_success PASSED
     tests/test_authentication_controller_db.py::test_login_db_invalid_credentials PASSED 
     tests/test_database.py::test_connection_pool_initialization PASSED
     tests/test_database.py::test_get_connection PASSED
     tests/test_main.py::test_read_root PASSED
     tests/test_session_controller.py::test_create_session PASSED
     tests/test_session_controller.py::test_invalidate_session PASSED
     tests/test_users_controller.py::test_read_users PASSED
     tests/test_users_controller.py::test_create_user PASSED
     tests/test_users_controller.py::test_update_user PASSED
     tests/test_users_controller.py::test_delete_user PASSED
     tests/test_users_controller.py::test_read_users_invalid_token PASSED
     tests/test_users_controller_db.py::test_read_users_db PASSED
     tests/test_users_controller_db.py::test_create_user_db PASSED
     tests/test_users_controller_db.py::test_update_user_db PASSED
     tests/test_users_controller_db.py::test_delete_user_db PASSED
     tests/test_users_controller_db.py::test_read_users_db_invalid_token PASSED

     ===================== 19 passed in 0.12s =====================
     ```

   - If the database is **not connected**, you’ll see failed messages for database-dependent tests:
     ```
     collected 19 items

     tests/test_authentication_controller.py::test_login_db_success FAILED
     tests/test_authentication_controller.py::test_login_db_invalid_credentials FAILED
     tests/test_authentication_controller_db.py::test_login_db_success FAILED
     tests/test_authentication_controller_db.py::test_login_db_invalid_credentials FAILED
     tests/test_database.py::test_connection_pool_initialization FAILED
     tests/test_database.py::test_get_connection PASSED
     tests/test_main.py::test_read_root PASSED
     tests/test_session_controller.py::test_create_session PASSED
     tests/test_session_controller.py::test_invalidate_session PASSED
     tests/test_users_controller.py::test_read_users PASSED
     tests/test_users_controller.py::test_create_user PASSED
     tests/test_users_controller.py::test_update_user PASSED
     tests/test_users_controller.py::test_delete_user PASSED
     tests/test_users_controller.py::test_read_users_invalid_token PASSED
     tests/test_users_controller_db.py::test_read_users_db FAILED
     tests/test_users_controller_db.py::test_create_user_db FAILED
     tests/test_users_controller_db.py::test_update_user_db FAILED
     tests/test_users_controller_db.py::test_delete_user_db FAILED
     tests/test_users_controller_db.py::test_read_users_db_invalid_token PASSED

     ===================== FAILURES =====================
     ```

### FRONTEND SETUP
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```

### RUNNING THE FRONTEND
To start the frontend, run:
```bash
npm run start
```

---

## Frontend Assignment

1. Go to the `frontend` folder and run:
   ```bash
   npm install
   npm run start
   ```
   This will open the project in [http://localhost:3000/](http://localhost:3000/).

2. **Styling**: Preferably use [Tailwind CSS](https://tailwindcss.com) for styling elements, but feel free to use your own CSS if you are not familiar with Tailwind.

### Requirements

- **Sidebar**: List 20 users. You can limit the number of users using the [DummyJSON documentation](https://dummyjson.com/docs/users).
- **Main Content Section**: Display the currently selected user’s details when a user is clicked in the sidebar. Show these fields:
  - "id", "firstName", "lastName", "age", "gender", "email", "phone"

#### Bonus Features

1. **Edit Functionality**: When a user is selected, implement an "Edit" functionality where all displayed fields are editable inputs. Upon submission, call the appropriate [update endpoint](https://dummyjson.com/docs/users#users-update) and refresh the view with the response.
2. **Match Syyclops Visual Identity**: Try to match Syyclops' visual identity (colors, logo, etc.).

---

## Backend Assignment

1. First, create and activate a virtual environment. Follow the [FastAPI virtual environment setup](https://fastapi.tiangolo.com/virtual-environments/).

2. Install FastAPI with:
   ```bash
   pip install "fastapi[standard]"
   ```

3. Run the server:
   ```bash
   fastapi dev main.py
   ```
   Your server should be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).

### Requirements

1. **User List Endpoint**: Create an endpoint that lists users similarly to the DummyJSON API.
   - Endpoint should be available at `/users`.
2. **Edit User Endpoint**: Create a `PUT` endpoint to edit a specific user based on their ID. Use the users list from the `users.py` file.

#### Bonus Features

1. **Connect React App**: Link the React frontend to use the new Python endpoints instead of DummyJSON.
2. **Tests**: Write tests to ensure functionality and endpoint accuracy.

---

### Contact
For help, please reach out to:
- jan@syyclops.com
- anthony.demattos@syyclops.com
