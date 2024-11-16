from enum import verify
from models.user_model import User_Model
from schemas.user_schema import Register_User, Login_User
from database import Base, engine, _Session
from fastapi import FastAPI, Depends, HTTPException, status
from utils import *
import uvicorn
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text

Base.metadata.create_all(engine)

def get_session():
    session = _Session()
    try:
        yield session
    finally:
        session.close()

app = FastAPI()

@app.get("/healthcheck")
def healthcheck():
    return {"message": "Hello, FastAPI!"}

@app.get("/healthcheck/db")
def db_healthcheck(session: Session = Depends(get_session)):
    try:
        # Attempt a simple query to check DB connection
        session.execute(text("SELECT 1"))
        return {"database": "healthy"}
    except SQLAlchemyError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )

@app.post("/signup")
def sign_up(user: Register_User, session: Session = Depends(get_session)):
    existing_user = session.execute(text("SELECT 1 FROM USERS WHERE email= :email"), {"email": user.email}).fetchone()
    if existing_user:
        raise HTTPException(
            400,
            "User already exists"
        )

    user_password = get_hashed_password(user.password)

    insert_query = """
    INSERT INTO USERS (username, email, password)
    VALUES (:username, :email, :password)
    """
    session.execute(text(insert_query), {
        "username": user.username,
        "email": user.email,
        "password": user.password
    })

    session.commit()

    return {"message": "User registration successful!"}

@app.get("/login")
def login(user: Login_User, session: Session = Depends(get_session)):
    existing_user = session.execute(text("SELECT 1 FROM USERS WHERE email= :email"), {"email": user.email}).fetchone()

    if not existing_user:
        raise HTTPException(404, "User not found")

    # Decrypt the pass of this user and match it with the password this guy gave
    # Or just hash the pass with the same hash function
    pass_verify = verify_password(user.password, existing_user.password)

    if not pass_verify:
        raise HTTPException(400, "Passwords do not match!")





# Main entry point for Uvicorn
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
