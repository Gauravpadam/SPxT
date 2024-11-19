from sqlalchemy.orm import Session
from sqlalchemy.sql import text

def check_db_health(session: Session):
    try:
        session.execute(text("SELECT 1"))
        return {"database": "healthy"}
    except Exception as e:
        return {"database": "unhealthy", "error": str(e)}