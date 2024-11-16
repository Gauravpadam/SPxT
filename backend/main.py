from models import user
from schemas import user_schema
from database import Base, engine, _Session
from fastapi import FastAPI, Depends, HTTPException, status
import uvicorn
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text

Base.metadata.create_all(engine)

def get_session():
    session = _Session()
    try:
        yield session
    finally:
        session.close()

app = FastAPI()

@app.get("/healthcheck")
def healthcheck():
    return {"message": "Hello, FastAPI!"}

@app.get("/healthcheck/db")
def db_healthcheck(session: Session = Depends(get_session)):
    try:
        # Attempt a simple query to check DB connection
        session.execute(text("SELECT 1"))
        return {"database": "healthy"}
    except SQLAlchemyError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )

# Main entry point for Uvicorn
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
