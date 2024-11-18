from sqlalchemy.orm import Session
from models.user_model import User_Model
from schemas.user_schema import Register_User
from decorators import sqlalchemy_retry_decorator

@sqlalchemy_retry_decorator
def get_user_by_email(session: Session, email: str):
    return session.query(User_Model).filter(User_Model.email == email).first()

@sqlalchemy_retry_decorator
def check_user_exists(session: Session, email: str):
    return session.query(User_Model).filter(User_Model.email == email).first() is not None

@sqlalchemy_retry_decorator
def insert_user(session: Session, user: Register_User, hashed_password: str):
    new_user = User_Model(username=user.username, email=user.email, password=hashed_password)
    session.add(new_user)
    session.commit()
    return new_user

@sqlalchemy_retry_decorator
def get_all_users(session: Session):
    return session.query(User_Model).all()

@sqlalchemy_retry_decorator
def update_user_password(session: Session, email: str, new_password: str):
    user = session.query(User_Model).filter(User_Model.email == email).first()
    if user:
        user.password = new_password
        session.commit()
        return user
    return None