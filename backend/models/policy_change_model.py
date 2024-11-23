from asyncio import Handle
from sqlalchemy import Column, String, Integer, DateTime, Boolean
from database.database import Base
import datetime

class Policy_Change_Model(Base):
    __tablename__ = "policy_change"
    policy_change_id = Column(Integer, primary_key=True, autoincrement=True)
    chapter_details = Column(String(2000))
    itc_hs = Column(String(100))
    export_policy = Column(String(2000))
    description = Column(String(2000))
    policy_condition = Column(String(2000))
    updated_at = Column(DateTime, default=datetime.datetime.now)
