import os
import time

import boto3
import datetime
from dotenv import load_dotenv
from llm_calls.retrieval import docs_retrieve
from conf import AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY
from schemas.chatbot_schema import ChatBotQuery
from langchain_aws import BedrockEmbeddings, ChatBedrock
from langchain_core.messages import HumanMessage, SystemMessage
from langfuse.callback import CallbackHandler

load_dotenv()

bedrock_client = boto3.client(
            "bedrock-runtime",
            region_name=AWS_REGION,
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        )

def alert_llm_call(product_description, policy_change_description, chapter_details):
    combined_input = (
        f'''
        You will be provided a trade policy in <trade_policy> XML tags and some policy chapter details in <chapter_details> XML tags, you will also be provided a product description in <product_description> XML tags.
        Your task is to determine how the trade policy will affect the given product and make an alert which will be shown to the user on the dashboard.
        Give the alert headline in <alert_headline> XML tags and the alert description in <alert_description> XML tags. Remember to keep headline under 100 characters and description under 500 characters.
        <trade_policy_change> {policy_change_description} </trade_policy_change>
        <chapter_details> {chapter_details} </chapter_details>
        <product_description> {product_description} </product_description>
        '''
    )

    model = ChatBedrock(
            model_id ="anthropic.claude-3-haiku-20240307-v1:0",
            client= bedrock_client
        )

    messages = [
        SystemMessage(content="You are an expert in the field of trade policy and are determining how the trade policy will affect the given product to generate an Alert."),
        HumanMessage(content=combined_input),
    ]

    start_time = time.time()
    response = model.invoke(messages)
    end_time = time.time()
    print(f"Time taken for LLM call: {end_time - start_time}")

    return response.content

def chatbot_llm_call(query: str):
    docs = docs_retrieve(query)
    combined_input = (
        '''You are given a query in the <query> XML tags, you are also be provided relevant documents from DGFT website in <docs> xml tags Read through the query and also the provided content and answer the users question.
        Your task is to give the answer if you are highly confident in your answer. Else respond with NO ANSWER.
        If the provided documents do not help you answer these questions then respond with INCORRECT CONTEXT.
        Respond in the same language as the query.
        Give your response in <answer> XML tags
        <query>'''+query+'''</query>
        <docs>'''+docs+'''</docs>'''
    )
    model = ChatBedrock(
            model_id ="anthropic.claude-3-haiku-20240307-v1:0",
            client= bedrock_client
    )
    messages = [
        SystemMessage(content="You are a helpful assitant, expert in the field of Import Export Compliance and Incentives for Government of India Ministry of Commerce & Industry Department of Commerce Directorate General of Foreign Trade. You are proficient in answering user questions based on the rules and regulation of DGFT"),
        HumanMessage(content=combined_input),
    ]

    response = model.invoke(messages)
    return response.content


def form_list_llm_call(data):
    combined_input = ('''You will be provided a list of form data that will have the form name in <form_name> XML tags and the form purpose in <form_purpose> XML tags along with form use case in <form_use_case>.
    You will also be given a prompt summarizing the user data in <input> XML tags.
    Your task is to go through all the details and return unchanged form names in <form> XML tags that the user has to fill for the given data in <form-list> XML tags. REMEMBER TO NOT CHANGE THE FORM NAME EVEN A LITTLE.
    '''+data)

    model = ChatBedrock(
            model_id ="anthropic.claude-3-haiku-20240307-v1:0",
            client= bedrock_client
    )

    messages = [
        SystemMessage(content="You are an expert in the field of import export forms and procedures for Government of India Ministry of Commerce & Industry Department of Commerce Directorate General of Foreign Trade."),
        HumanMessage(content=combined_input),
    ]

    response = model.invoke(messages)

    return response.content
