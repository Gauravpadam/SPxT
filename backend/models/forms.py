from asyncio import Handle
from sqlalchemy import Column, String, Integer, DateTime, Boolean
from database.database import Base
import datetime

class Forms_Model(Base):
    __tablename__ = "forms"
    form_id = Column(Integer, primary_key=True, autoincrement=True)
    form_name = Column(String(500))
    form_purpose = Column(String(500))
    form_use_case = Column(String(500))
    updated_at = Column(DateTime, default=datetime.datetime.now)
