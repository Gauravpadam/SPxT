from pydantic import BaseModel
import datetime

class Register_User(BaseModel):
    username: str
    email: str
    password: str

class Login_User(BaseModel):
    email: str
    password: str
