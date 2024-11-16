from pydantic import BaseModel
import datetime

class Create_User(BaseModel):
    username: str
    email: str
    password: str
