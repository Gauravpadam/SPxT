import os
from passlib.context import CryptContext
from datetime import datetime, timedelta
from conf import ALGORITHM, JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY, ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE
from jose import jwt
from typing import Union, Any

assert (ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE) != (None, None)

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_hashed_password(password: str) -> str:
    return password_context.hash(password)

def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)

def create_access_token(subject: Union[str, Any], expires_delta: Union[int, Any] = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + timedelta(seconds = expires_delta)
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes = (float(ACCESS_TOKEN_EXPIRE) if ACCESS_TOKEN_EXPIRE else 30))

    to_encode = {"exp": expires_delta, "sub": str(subject)}

    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
    return encoded_jwt

def create_refresh_token(subject: Union[str, Any], expires_delta: Union[int, Any] = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + timedelta(seconds = expires_delta)
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes = (float(ACCESS_TOKEN_EXPIRE) if ACCESS_TOKEN_EXPIRE else 30))

    to_encode = {"exp": expires_delta, "sub": str(subject)}

    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
    return encoded_jwt
