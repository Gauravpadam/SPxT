from models.user_model import User_Model
from schemas.user_schema import Register_User, Login_User
from database import Base, engine, _Session
from fastapi import FastAPI, Depends, HTTPException, status
from auth_bearer import jwt_bearer
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

    hashed_password = get_hashed_password(user.password)

    insert_query = """
    INSERT INTO USERS (username, email, password)
    VALUES (:username, :email, :password)
    """

    session.execute(text(insert_query), {
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    })

    session.commit()

    return {"message": "User registration successful!"}

@app.post("/login")
def login(user: Login_User, session: Session = Depends(get_session)):
    print(user)
    existing_user = session.execute(text("SELECT * FROM USERS WHERE email= :email"), {"email": user.email}).fetchone()

    print(existing_user)

    if not existing_user:
        raise HTTPException(404, "User not found")

    # Decrypt the pass of this user and match it with the password this guy gave
    # Or just hash the pass with the same hash function
    pass_verify = verify_password(user.password, existing_user.password)

    if not pass_verify:
        raise HTTPException(400, "Passwords do not match!")

    existing_user_id = existing_user.id

    access_token = create_access_token(existing_user_id)
    refresh_token = create_refresh_token(existing_user_id)

    insert_query = """
    INSERT INTO TOKENS (user_id, access_token, refresh_token, status)
    VALUES (:user_id, :access_token, :refresh_token, :status)
    """

    session.execute(text(insert_query),{
        "user_id": existing_user_id,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "status": True
    })

    session.commit()

    return {"message": "Login successful!", "access_token": access_token, "refresh_token": refresh_token}

# Accessing the jwt via depends over here
@app.get("/get_users")
def get_users(token=Depends(jwt_bearer), session: Session = Depends(get_session)):
    query = "SELECT * FROM USERS"
    try:
        users = session.execute(text(query)).all()
        # Convert to a list of dictionaries
        return [user._mapping for user in users]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Main entry point for Uvicorn
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
