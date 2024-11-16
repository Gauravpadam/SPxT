from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from conf import DATABASE_URL

assert DATABASE_URL != "None"

engine = create_engine(DATABASE_URL)


try:
    # Test the connection by executing a query
    with engine.connect() as connection:
        result = connection.execute("SELECT 1")
        print("Connection successful")
except Exception as e:
    print(f"Connection failed: {e}")

Base = declarative_base()
_Session = sessionmaker(bind=engine, expire_on_commit=False)
