from functools import wraps
import json
import os
import re
from fastapi import HTTPException
from passlib.context import CryptContext
from datetime import datetime, timedelta

from sqlalchemy.sql import text
from conf import ALGORITHM, JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY, ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE
import jwt
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

def token_blacklisted(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Ensure token and session are provided
        token = kwargs.get("token")
        session = kwargs.get("session")

        if not token or not session:
            raise HTTPException(400, "Invalid request. Missing token or session.")

        try:
            # Decode the token
            payload = jwt.decode(token, JWT_SECRET_KEY, ALGORITHM)
            user_id = payload['sub']
        except jwt.ExpiredSignatureError:
            raise HTTPException(403, "Token has expired")
        except jwt.InvalidTokenError:
            raise HTTPException(403, "Invalid token")

        # Check token status in the database
        find_token_status_query = """
        SELECT STATUS FROM TOKENS WHERE user_id = :user_id AND access_token = :access_token
        """
        token_status = session.execute(text(find_token_status_query), {
            "user_id": user_id,
            "access_token": token
        }).fetchone()

        print(token_status.status)

        # If the token is invalid or not found, raise an exception
        if not token_status or not token_status.status:
            raise HTTPException(403, "Token has been blacklisted")

        # Proceed with the wrapped function
        return func(*args, **kwargs)

    return wrapper

def alert_extract_xml_content(input_string):
    alert_headline_pattern = r"<alert_headline>(.*?)</alert_headline>"
    alert_description_pattern = r"<alert_description>(.*?)</alert_description>"

    alert_headline_match = re.search(alert_headline_pattern, input_string, re.DOTALL)
    alert_description_match = re.search(alert_description_pattern, input_string, re.DOTALL)

    alert_headline_txt = alert_headline_match.group(1) if alert_headline_match else None
    alert_description_txt = alert_description_match.group(1) if alert_description_match else None

    return alert_headline_txt, alert_description_txt