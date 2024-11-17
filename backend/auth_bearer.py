import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from models.token_model import Token_Model
from conf import ALGORITHM, JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY, ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE

def decode_jwt(jwt_token: str):
    try:
        # Decoding the token
        payload = jwt.decode(jwt_token, JWT_SECRET_KEY, ALGORITHM)
        return payload
    except InvalidTokenError:
        return None

class Jwt_Bearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(Jwt_Bearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials | None = await super(Jwt_Bearer, self).__call__(request)

        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwt_token):
        payload = decode_jwt(jwt_token)
        return bool(payload)

jwt_bearer = Jwt_Bearer()
