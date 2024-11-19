from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.user_schema import Register_User, Login_User, Change_User_Pass
from services.user_service import (
    register_user,
    login_user,
    get_all_users,
    update_password,
    logout_user
)
from database.database import get_session
from auth_bearer import jwt_bearer
from utils import token_blacklisted

router = APIRouter()

@router.post("/signup")
def sign_up(user: Register_User, session: Session = Depends(get_session)):
    return register_user(user, session)

@router.post("/login")
def login(user: Login_User, session: Session = Depends(get_session)):
    return login_user(user, session)

@router.get("/get_users")
@token_blacklisted
def get_users(token=Depends(jwt_bearer), session: Session = Depends(get_session)):
    return get_all_users(session)

@router.post("/change_password")
def change_password(password_update_form: Change_User_Pass, session: Session = Depends(get_session)):
    return update_password(password_update_form, session)

@router.post("/logout")
def logout(token=Depends(jwt_bearer), session: Session = Depends(get_session)):
    return logout_user(token, session)