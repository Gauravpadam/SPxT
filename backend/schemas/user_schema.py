from pydantic import BaseModel
import datetime

class Register_User(BaseModel):
    username: str
    email: str
    password: str

class Login_User(BaseModel):
    email: str
    password: str

class Change_User_Pass(BaseModel):
    email: str
    old_password: str
    new_password: str
