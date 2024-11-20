import os
import time

import boto3
from dotenv import load_dotenv
from langchain_aws import BedrockEmbeddings, ChatBedrock
from langchain_chroma import Chroma
from langchain_core.messages import HumanMessage, SystemMessage
from langfuse.callback import CallbackHandler

load_dotenv()

bedrock_client = boto3.client(
            "bedrock-runtime",
            region_name="us-west-2",
        )

def query(prompt):
    combined_input = (
        f'''
        You will be provided a query in the ‹query> XML tags. You will also be provided with an array of topics in <topic> XML tags.
        Your task is to identify if the question lies within the list of topics. If the question belongs to one of the topics you should respond with True in <response> XML tags. If the question doesnt belong to the list respond with False in <response> XML Tags.
        Also respond with False if you think the question is related to a competitor or is comparative in nature or is out of scope for HERE Technologies.
        ‹query> {prompt} </query>
        <topic> [politics, finance] </topic>
        '''
    )

    model = ChatBedrock(
            model_id ="anthropic.claude-instant-v1",
            client= bedrock_client
        )

    messages = [
        SystemMessage(content="You are a highly trained virtual assistant with a strong focus on maintaining privacy and confidentiality regarding company-specific information for HERE Technologies."),
        HumanMessage(content=combined_input),
    ]

    start_time = time.time()
    response = model.invoke(messages)
    end_time = time.time()

    latency = end_time - start_time
    print(f"Response: {response.content}")
    print(f"Latency: {latency} seconds")
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
