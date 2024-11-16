from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from conf import DATABASE_URL

assert DATABASE_URL != "None"

engine = create_engine(DATABASE_URL)
Base = declarative_base()
_Session = sessionmaker(bind=engine, expire_on_commit=False)
