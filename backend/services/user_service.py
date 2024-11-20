from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from schemas.user_schema import Register_User, Login_User, Change_User_Pass
from utils import get_hashed_password, verify_password, create_access_token, create_refresh_token
import jwt
from auth_bearer import JWT_SECRET_KEY, ALGORITHM
from database.user_queries import (
    get_user_by_email,
    check_user_exists,
    insert_user,
    get_all_users as get_all_users_repo,
    update_user_password
)
from database.token_queries import (
    insert_token,
    disable_token
)

def register_user(user: Register_User, session: Session):
    if check_user_exists(session, user.email):
        raise HTTPException(400, "User already exists")

    hashed_password = get_hashed_password(user.password)
    insert_user(session, user, hashed_password)

    return {"message": "User registration successful!"}

def login_user(user: Login_User, session: Session):
    existing_user = get_user_by_email(session, user.email)

    if not existing_user:
        raise HTTPException(404, "User not found")

    pass_verify = verify_password(user.password, existing_user.password)

    if not pass_verify:
        raise HTTPException(400, "Passwords do not match!")

    existing_user_id = existing_user.id

    access_token = create_access_token(existing_user_id)
    refresh_token = create_refresh_token(existing_user_id)

    insert_token(session, existing_user_id, access_token, refresh_token)

    return {"message": "Login successful!", "access_token": access_token, "refresh_token": refresh_token, "user_id":existing_user_id}

def get_all_users(session: Session):
    try:
        users = get_all_users_repo(session)
        return [user.__dict__ for user in users]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_password(password_update_form: Change_User_Pass, session: Session):
    try:
        existing_user = get_user_by_email(session, password_update_form.email)

        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found.")

        if not verify_password(password_update_form.old_password, existing_user.password):
            raise HTTPException(status_code=401, detail="Old password is not valid!")

        hashed_password = get_hashed_password(password_update_form.new_password)
        update_user_password(session, password_update_form.email, hashed_password)

        return {"message": "Password updated successfully."}

    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail="Internal server error") from e

def logout_user(token: str, session: Session):
    payload = jwt.decode(token, JWT_SECRET_KEY, ALGORITHM)
    user_id = payload['sub']

    disable_token(session, user_id, token)

    return {"message": "Logout successful"}