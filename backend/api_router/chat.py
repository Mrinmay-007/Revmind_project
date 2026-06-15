
from fastapi import APIRouter,HTTPException #type:ignore

import os
import textwrap
import requests


from dotenv import load_dotenv #type:ignore

load_dotenv()

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")




from .chat_config import ChatRequest,ChatResponse,build_data_context
router = APIRouter(
    prefix="/api",
    tags=["API"]
)


# -----------------------------------------------
# POST /api/chat
# -----------------------------------------------


@router.post("/chat", response_model=ChatResponse, summary="LLM-powered Q&A")
def chat(body: ChatRequest) -> ChatResponse:
    """
    Accept a natural-language question about NovaBite sales data and return
    an accurate, data-grounded answer via a free Groq-hosted LLM.
    """
    if not body.question or not body.question.strip():
        raise HTTPException(status_code=400, detail="Question must not be empty.")

    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY environment variable is not set. "
                   "Get a free key at https://console.groq.com/keys",
        )

    data_context = build_data_context()

    system_prompt = textwrap.dedent(f"""
        You are a precise business analyst assistant for NovaBite, a consumer goods company.
        You have access to the company's complete sales data for January 2024 through December 2025.

        Use ONLY the data context provided below to answer the user's question.
        Be concise, specific, and include exact figures where relevant.
        If the data context does not contain enough information to answer, say so clearly.

        {data_context}
    """).strip()

    try:
        resp = requests.post(
            GROQ_API_URL,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": GROQ_MODEL,
                "max_tokens": 1024,
                "temperature": 0.2,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": body.question},
                ],
            },
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
        answer = data["choices"][0]["message"]["content"]
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"LLM request failed: {e}")
    except (KeyError, IndexError):
        answer = "No response generated."

    return ChatResponse(answer=answer)