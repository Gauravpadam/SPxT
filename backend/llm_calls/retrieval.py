import boto3

from conf import AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, KNOWLEDGE_BASE_ID

def docs_retrieve(query):
    bedrock_agent_runtime = boto3.client(
    service_name = "bedrock-agent-runtime",
    aws_access_key_id = AWS_ACCESS_KEY_ID,
    aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
    )
    retrieved =  bedrock_agent_runtime.retrieve(
        retrievalQuery= {
            'text': query
        },
        knowledgeBaseId=KNOWLEDGE_BASE_ID,
        retrievalConfiguration = {
        "vectorSearchConfiguration": {
        "numberOfResults": 3,
        "overrideSearchType": "SEMANTIC"}}
    )
    retrieved_string = ""
    for i in range(len(retrieved['retrievalResults'])):
        retrieved_string += retrieved['retrievalResults'][i]['content']['text']
    return retrieved_string
