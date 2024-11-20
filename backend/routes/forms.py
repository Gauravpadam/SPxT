from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.database import get_session
from schemas.forms_schema import FormRequestData
from services.forms_service import get_forms

router = APIRouter()

@router.post("/get-forms")
def get_alerts(data: FormRequestData , session: Session = Depends(get_session)):
    # response = get_forms(session,data=data)
    return data.dict()