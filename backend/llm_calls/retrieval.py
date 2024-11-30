from langchain_community.retrievers import AzureAISearchRetriever
from conf import AZURE_AI_SEARCH_INDEX_NAME

def docs_retrieve(query):
    retriever = AzureAISearchRetriever(
        content_key="chunk", top_k=3, index_name=AZURE_AI_SEARCH_INDEX_NAME or ""
    )

    response = retriever.invoke(query)
    retrieved_string = ""

    for i, chunk in enumerate(response):
        retrieved_string+=f'<Document {i + 1}>{chunk.page_content}</Document {i + 1}>'

    return retrieved_string
