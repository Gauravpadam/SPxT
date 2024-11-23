from pydantic import BaseModel
import datetime

class ChatBotQuery(BaseModel):
    query: str
