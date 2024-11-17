from pydantic import BaseModel
import datetime

class Token_Schema(BaseModel):
    access_token: str
    refresh_token: str

class Create_Token(BaseModel):
    user_id: str
