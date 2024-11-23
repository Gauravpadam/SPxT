from sqlalchemy import Column, String, Integer, DateTime, Boolean
from database.database import Base
import datetime

class Real_Time_Alerts(Base):
    __tablename__ = "alerts"
    alert_id = Column(Integer, primary_key=True)
    alert_headline = Column(String(500))
    alert_description = Column(String(500))
    product_id = Column(Integer)
    user_id = Column(Integer)
    updated_at = Column(DateTime, default=datetime.datetime.now)
