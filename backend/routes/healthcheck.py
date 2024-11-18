from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from services.healthcheck_service import check_db_health
from database import get_session

router = APIRouter()

@router.get("/healthcheck")
def healthcheck():
    return {"message": "Hello, FastAPI!"}

@router.get("/healthcheck/db")
def db_healthcheck(session: Session = Depends(get_session)):
    return check_db_health(session)