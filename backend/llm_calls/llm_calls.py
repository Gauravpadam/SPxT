import os
import time

import boto3
import datetime
from dotenv import load_dotenv
from schemas.chatbot_schema import ChatBotQuery
from langchain_aws import BedrockEmbeddings, ChatBedrock
from langchain_chroma import Chroma
from langchain_core.messages import HumanMessage, SystemMessage
# from langfuse.callback import CallbackHandler

load_dotenv()

bedrock_client = boto3.client(
            "bedrock-runtime",
            region_name="us-west-2",
            aws_access_key_id="AKIAR25KQARGQO3ZUU2Z",
            aws_secret_access_key="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",
        )

def alert_llm_call(product_description, policy_change_description):
    combined_input = (
        f'''
        You will be provided a trade policy in <trade_policy> XML tags, you will also be provided a product description in <product_description> XML tags.
        Your task is to determine how the trade policy will affect the given product and make an alert which will be shown to the user on the dashboard.
        Give the alert headline in <alert_headline> XML tags and the alert description in <alert_description> XML tags. Remember to keep headline under 100 characters and description under 500 characters.
        <trade_policy_change> {policy_change_description} </trade_policy_change>
        <product_description> {product_description} </product_description>
        '''
    )

    model = ChatBedrock(
            model_id ="anthropic.claude-instant-v1",
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

# langfuse_handler = CallbackHandler(
#   secret_key="sk-lf-c24addf1-e109-4a58-a132-def1b031d17b",
#   host="http://localhost:3000"
# )

# current_dir = os.path.dirname(os.path.abspath(__file__))
# persistent_directory = os.path.join(
#     current_dir, "../Database/db", "chroma_db")
# embeddings = BedrockEmbeddings(
#         model_id ="amazon.titan-embed-text-v1",
#         client= bedrock_client
#     )


# db = Chroma(persist_directory=persistent_directory,
#             embedding_function=embeddings)

# retriever = db.as_retriever(
#     search_type="similarity",
#     search_kwargs={"k": 3},
# )
# relevant_docs = retriever.invoke(query)
# result_docs = ([doc.page_content for doc in relevant_docs])

def chatbot_llm_call(query: str, query_timestamp: datetime.datetime, products_list, alerts_applied):
    return "Hello"


def form_list_llm_call(data):
    combined_input = ('''You will be provided a list of form data that will have the form name in <form_name> XML tags and the form purpose in <form_purpose> XML tags along with form use case in <form_use_case>. 
    You will also be given a prompt summarizing the user data in <input> XML tags.
    Your task is to go through all the details and return the list of forms that the user has to fill for the given data in <form-list> XML tags.''')
    
    model = ChatBedrock(
            model_id ="anthropic.claude-instant-v1",
            client= bedrock_client
        )
    
    messages = [
        SystemMessage(content="You are an expert in the field of import export forms and procedures."),
        HumanMessage(content=combined_input),
    ]

    response = model.invoke(messages)

    return response.content