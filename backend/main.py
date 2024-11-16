from models import user
from schemas import user_schema
from database import Base, engine, _Session
from fastapi import FastAPI, Depends, HTTPException, status
import uvicorn
from sqlalchemy.orm import Session

Base.metadata.create_all(engine)

def get_session():
    session = _Session()
    try:
        yield session
    finally:
        session.close()

app = FastAPI()

@app.get("/healthcheck")
def read_root():
    return {"message": "Hello, FastAPI!"}

# Main entry point for Uvicorn
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
