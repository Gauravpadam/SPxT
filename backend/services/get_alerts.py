from sqlalchemy.orm import Session
from models.policy_change_model import Policy_Change_Model
from models.product_model import Product_Model
from models.user_model import User_Model
from models.real_time_alerts_model import Real_Time_Alerts
from llm_calls.llm_calls import query
import datetime

def make_llm_call():
    # Test querying the model directly
    prompt = "What is the capital of France?"
    response = query(prompt)
    print("Response from Llama3:", response)
    return "Alert Headline", response

def populate_alerts_service(session: Session):
    # Query to get all policy changes
    policy_changes = session.query(Policy_Change_Model).all()
    
    affected_users = set()
    
    for policy_change in policy_changes:
        # Query to get products affected by the policy change
        affected_products = session.query(Product_Model).filter(Product_Model.itc_hs == policy_change.itc_hs).all()
        
        for product in affected_products:
            # Add the user_id of the affected product to the set
            affected_users.add(product.user_id)
            # Make LLM call to get alert details
            alert_headline, alert_description = make_llm_call()
            
            # Insert alert into the alerts table
            new_alert = Real_Time_Alerts(
                alert_headline=alert_headline,
                alert_description=alert_description,
                product_id=product.product_id,
                user_id=product.user_id,
                updated_at=datetime.datetime.now()
            )
            session.add(new_alert)
    
    session.commit()
    
    # Query to get user details
    users = session.query(User_Model).filter(User_Model.id.in_(affected_users)).all()
    
    return "Users affected by policy changes: {}".format([user.username for user in users])
