from sqlalchemy import Column, String, Integer, DateTime, Boolean
from database import Base
import datetime

class Token_Model(Base):
    __tablename__ = "tokens"
    user_id = Column(Integer)
    access_token = Column(String(450), primary_key=True)
    refresh_token = Column(String(450), nullable=False)
    status = Column(Boolean)
    created_date = Column(DateTime, default=datetime.datetime.now)
