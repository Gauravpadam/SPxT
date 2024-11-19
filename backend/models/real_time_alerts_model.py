from asyncio import Handle
from sqlalchemy import Column, String, Integer, DateTime, Boolean
from database.database import Base
import datetime

class Real_Time_Alerts(Base):
    __tablename__ = "alerts"
    alert_headline = Column(String(200))
    alert_description = Column(String(300))
    product_id = Column(Integer)
    user_id = Column(Integer)
    updated_at = Column(DateTime, default=datetime.datetime.now)
