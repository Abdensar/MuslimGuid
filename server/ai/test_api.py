import os
from dotenv import load_dotenv
import requests

load_dotenv()

headers = {
    "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
    "HTTP-Referer": os.getenv('APP_URL'),
    "X-Title": "Muslim Guide"
}

response = requests.post(
    "https://openrouter.ai/api/v1/chat/completions",
    headers=headers,
    json={
        "model": "openai/gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "What is Islam in one sentence?"}]
    }
)

print(response.json())