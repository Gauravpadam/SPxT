from sqlalchemy.orm import Session
from models.token_model import Token_Model
from decorators.retry_decorators import sqlalchemy_retry_decorator

@sqlalchemy_retry_decorator
def insert_token(session: Session, user_id: int, access_token: str, refresh_token: str):
    new_token = Token_Model(user_id=user_id, access_token=access_token, refresh_token=refresh_token, status=True)
    session.add(new_token)
    session.commit()
    return new_token

@sqlalchemy_retry_decorator
def disable_token(session: Session, user_id: int, access_token: str):
    token = session.query(Token_Model).filter(Token_Model.user_id == user_id, Token_Model.access_token == access_token).first()
    if token:
        token.status = False
        session.commit()
        return token
    return None
