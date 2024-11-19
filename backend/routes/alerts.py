from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.database import get_session
from services.get_alerts import get_alerts_service

router = APIRouter()

@router.get("/get-alerts")
def get_alerts(userId, session: Session = Depends(get_session)):
    response = get_alerts_service(session)
    print(response)
    return {response}

