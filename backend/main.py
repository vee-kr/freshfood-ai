import os
import base64
import json
import io
import httpx
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageOps
from dotenv import load_dotenv
from openai import OpenAI
from openai.types.chat import (
    ChatCompletionUserMessageParam,
    ChatCompletionContentPartTextParam,
    ChatCompletionContentPartImageParam
)

from pathlib import Path
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")

proxy_address = os.getenv("WEBSHARE_PROXY_ADDRESS")
proxy_port = os.getenv("WEBSHARE_PROXY_PORT")
proxy_username = os.getenv("WEBSHARE_PROXY_USERNAME")
proxy_password = os.getenv("WEBSHARE_PROXY_PASSWORD")


# Configure the OpenRouter client with a proxy if proxy settings are available

if all([proxy_address, proxy_port, proxy_username, proxy_password]):

    proxy = (
        f"http://{proxy_username}:{proxy_password}"
        f"@{proxy_address}:{proxy_port}"
    )

    http_client = httpx.Client(
        proxy=proxy
    )
    client = OpenAI(
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1",
        http_client=http_client
    )

else:
    client = OpenAI(
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1"
    )


app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent.parent

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:63342",
                   "https://freshfood-ai-red.vercel.app"
                   ],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Scan a food package and return its name and expiration date

@app.post("/scan")
@app.post("/api/scan")
async def scan_food(photo: UploadFile = File(...)):
    contents = await photo.read()

    # Open the uploaded image and correct its orientation

    image = Image.open(io.BytesIO(contents))
    image = ImageOps.exif_transpose(image)
    image = image.convert("RGB")

    # Convert the image to JPEG and then encode it as Base64

    buffer = io.BytesIO()
    image.save(buffer, format="JPEG")
    image_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    # Add AI instructions

    text_part: ChatCompletionContentPartTextParam = {
        "type": "text",
        "text": """
    Here is a photo of a food package.

    Identify:
    1. The product name.
    2. The expiration date.

    Carefully inspect the entire ORIGINAL IMAGE.

    PRODUCT NAME:
    - Read the product name from visible text on the package.
    - If the product name is not visible or cannot be identified, return "NOT_FOUND".
    - Do not invent a product name.

    EXPIRATION DATE:
    - Prefer a date labeled EXP, EXPIRY, BEST BEFORE, USE BY, or another clear expiration label.
    - Do NOT use a date labeled MFG, MANUFACTURED, PRODUCTION, or another clear production label.
    - If multiple dates are visible and one is clearly labeled as the expiration date, use that date.
    - If multiple dates are visible but there are no labels indicating which is the expiration date, use the LATER date as the expiration date.
    - Never choose the earlier date over a later date unless the package explicitly identifies the earlier date as the expiration date.
    - Only use dates that are actually visible in the image.
    - If no usable date is visible, return "NOT_FOUND".

    DATE FORMAT:
    Dates may appear as:
    - DD.MM.YYYY
    - DD/MM/YYYY
    - DD-MM-YYYY
    - DD MM YYYY
    - MM.DD.YYYY
    - MM/DD/YYYY
    - MM-DD-YYYY
    - YYYY.MM.DD
    - YYYY/MM/DD
    - YYYY-MM-DD

    Convert the expiration date to YYYY-MM-DD.

    Examples:
    - 13.10.2026 → 2026-10-13
    - 13/10/2026 → 2026-10-13
    - 13-10-2026 → 2026-10-13
    - 13 10 2026 → 2026-10-13
    - 10/13/2026 → 2026-10-13
    - 2026-10-13 → 2026-10-13

    IMPORTANT:
    If the image contains:
    17.07.2025
    13.01.2026

    and there are no labels identifying the dates, choose:
    13.01.2026

    and return:
    2026-01-13

    OUTPUT:
    Return ONLY one valid JSON object.
    Do not return Markdown.
    Do not return ```json.
    Do not return explanations.
    Do not return reasoning.
    Do not return any text before or after the JSON.

    Use exactly this format:

    {"name":"product name or NOT_FOUND","expirationDate":"YYYY-MM-DD or NOT_FOUND"}
    """
    }

    # Add the food photo to the AI

    image_part: ChatCompletionContentPartImageParam = {
        "type": "image_url",
        "image_url": {
            "url": f"data:image/jpeg;base64,{image_base64}"
        }
    }

    # Combine the instructions and image into one user message
    message: ChatCompletionUserMessageParam = {
        "role": "user",
        "content": [text_part, image_part]
    }

    # AI models

    PRIMARY_MODEL = "google/gemma-4-26b-a4b-it:free"

    FALLBACK_MODELS = [
        "google/gemma-4-31b-it:free",
        "qwen/qwen3.8-27b:free",
    ]



    # Send the message to the AI service
    try:
        response = client.chat.completions.create(
            model=PRIMARY_MODEL,
            extra_body={
                "models": FALLBACK_MODELS
            },
            max_tokens=1000,
            messages=[message]
        )

    except Exception as error:
        print("OpenRouter error:", error)
        raise HTTPException(
            status_code=502,
            detail="Could not connect to the AI service."
        )


    # Parse the AI response as JSON

    try:
        ai_result = response.choices[0].message.content or ""
        ai_result = ai_result.strip()

        print("RAW AI RESPONSE:", repr(ai_result))

        if not ai_result:
            raise ValueError("The AI returned an empty response.")

        if ai_result.startswith("```"):
            lines = ai_result.splitlines()

            if lines and lines[0].strip().startswith("```"):
                lines = lines[1:]

            if lines and lines[-1].strip() == "```":
                lines = lines[:-1]

            ai_result = "\n".join(lines).strip()

        start = ai_result.find("{")
        end = ai_result.rfind("}")

        if start == -1 or end == -1 or end < start:
            raise ValueError("No JSON object found in the AI response.")

        ai_result = ai_result[start:end + 1]

        ai_result = json.loads(ai_result)
    except (AttributeError, json.JSONDecodeError, TypeError, ValueError) as error:
        print("AI response error:", error)
        raise HTTPException(
            status_code=502,
            detail="The AI returned an invalid response."
        )
    print(f"AI Result: {ai_result}")

    # Return the extracted information

    return {
        "message": "Photo scanned!",
        "name": ai_result["name"],
        "expirationDate": ai_result["expirationDate"]}


                                                # Frontend files

# Serve the CSS and the JavaScript files to the frontend

app.mount(
    "/css",
    StaticFiles(directory=str(BASE_DIR / "css")),
    name="css"
)

app.mount(
    "/js",
    StaticFiles(directory=str(BASE_DIR / "js")),
    name="js"
)

app.mount(
    "/images",
    StaticFiles(directory=str(BASE_DIR / "images")),
    name="images"
)

# Serve the main frontend pages

@app.get("/", include_in_schema=False)
async def home():
    return FileResponse(BASE_DIR / "index.html")

@app.get("/index.html", include_in_schema=False)
async def index_page():
    return FileResponse(BASE_DIR / "index.html")


@app.get("/scan.html", include_in_schema=False)
async def scan_page():
    return FileResponse(BASE_DIR / "scan.html")


@app.get("/result.html", include_in_schema=False)
async def result_page():
    return FileResponse(BASE_DIR / "result.html")


@app.get("/my-food.html", include_in_schema=False)
async def my_food_page():
    return FileResponse(BASE_DIR / "my-food.html")