from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from Controllers.authenticationController import router as auth_router
from Controllers.usersController import router as user_router
from Controllers.authenticationControllerDB import router as auth_db_router
from Controllers.usersControllerDB import router as user_db_router
from exceptions import DatabaseNotConnectedException

app = FastAPI()

# CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(user_router)
app.include_router(auth_db_router)  # Include the DB router for authentication
app.include_router(user_db_router)  # Include the DB router for user operations

@app.get("/")
async def read_root():
    return {"Hello": "World"}

# Exception handler for database connection issues
@app.exception_handler(DatabaseNotConnectedException)
async def db_not_connected_exception_handler(request, exc):
    return JSONResponse(
        status_code=503,
        content={"detail": "Database not connected. Some functionalities may not work."}
    )
