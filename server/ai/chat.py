import sys
import json
import os
from dotenv import load_dotenv
import requests

load_dotenv()

def get_ai_response(message):
    """Get response from OpenRouter API"""
    headers = {
        "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
        "HTTP-Referer": os.getenv('APP_URL', 'http://localhost:5000'),
        "X-Title": "Muslim Guide AI",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": os.getenv('AI_MODEL', 'openai/gpt-3.5-turbo'),
        "messages": [
            {
                "role": "system",
                "content": """You are an Islamic assistant called المرشد . Provide:
                - Accurate information from Quran and Hadith
                - Moderate, balanced views
                - Clear references when possible
                - Answers in the user's language"""
            },
            {
                "role": "user",
                "content": message
            }
        ],
        "temperature": 0.7
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=10
        )
        response.raise_for_status()
        
        content = response.json().get('choices', [{}])[0].get('message', {}).get('content', '')
        
        if not content:
            raise ValueError("Empty response content")
            
        return {
            "response": content,
            "status": "success",
            "model": payload["model"]
        }
        
    except requests.exceptions.RequestException as e:
        return {
            "response": "I'm unable to respond right now due to technical difficulties.",
            "status": "error",
            "details": f"API Error: {str(e)}"
        }
    except Exception as e:
        return {
            "response": "An error occurred while processing your request.",
            "status": "error",
            "details": f"Processing Error: {str(e)}"
        }

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        message = input_data.get('message', '')
        
        result = get_ai_response(message)
        print(json.dumps(result, indent=2))
        
    except json.JSONDecodeError:
        print(json.dumps({
            "status": "error",
            "response": "Invalid input format",
            "details": "Expected JSON input"
        }))
    except Exception as e:
        print(json.dumps({
            "status": "error",
            "response": "System error",
            "details": str(e)
        }))