from sqlalchemy.orm import Session
from models.real_time_alerts_model import Real_Time_Alerts
from decorators.retry_decorators import sqlalchemy_retry_decorator


@sqlalchemy_retry_decorator
def get_alerts_by_user_id(session: Session, user_id: int):
    alerts = session.query(Real_Time_Alerts).filter_by(user_id=user_id).all()
    print("Alerts",alerts)
    return [{'alert_headline': alert.alert_headline, 'alert_description': alert.alert_description} for alert in alerts]