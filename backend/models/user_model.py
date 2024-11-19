from sqlalchemy import Column, Integer, String, DateTime, Boolean
from database.database import Base

class User_Model(Base):
    __tablename__ = "users" # This is the tablename ffs, not the classname
    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
