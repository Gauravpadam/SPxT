from typing import List
from sqlalchemy import RowMapping
from sqlalchemy.orm import Session
from llm_calls.llm_calls import chatbot_llm_call
from schemas.chatbot_schema import ChatBotQuery
from utils import chat_answer_extract_xml_content

def process_chat_query(chatbot_query: ChatBotQuery, token, session: Session):
    query: str = chatbot_query.query
    response = chatbot_llm_call(query)
    fin_response = chat_answer_extract_xml_content(response)
    return fin_response
