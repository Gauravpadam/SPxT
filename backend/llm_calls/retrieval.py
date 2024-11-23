import boto3

def docs_retrieve(query):
    bedrock_agent_runtime = boto3.client(
    service_name = "bedrock-agent-runtime",
    aws_access_key_id = 'AKIAR25KQARGQO3ZUU2Z',
    aws_secret_access_key = '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',
    region_name="us-west-2",
    )
    retrieved =  bedrock_agent_runtime.retrieve(
        retrievalQuery= {
            'text': query
        },
        knowledgeBaseId='MMPN2MR7TQ',
        retrievalConfiguration = {
        "vectorSearchConfiguration": {
        "numberOfResults": 3,
        "overrideSearchType": "SEMANTIC"}}
    )
    retrieved_string = ""
    for i in range(len(retrieved['retrievalResults'])):
        retrieved_string += retrieved['retrievalResults'][i]['content']['text']
    return retrieved_string