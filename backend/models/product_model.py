from sqlalchemy import Column, String, Integer, DateTime, Boolean
from database.database import Base
import datetime

class Product_Model(Base):
    __tablename__ = "products"
    user_id = Column(Integer)
    product_id = Column(Integer, primary_key=True)
    itc_hs = Column(String(50))
    product_name = Column(String(100))
    product_description = Column(String(500))
    updated_at = Column(DateTime, default=datetime.datetime.now)
