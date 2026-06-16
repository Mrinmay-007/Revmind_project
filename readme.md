# NovaBite Sales Analytics Dashboard

A full-stack sales analytics application built with **React + Vite** on the frontend and **FastAPI + SQLite** on the backend. The application provides interactive sales dashboards, business KPI analysis, trend visualization, and AI-powered natural language insights using Groq's LLaMA model.

---

# Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML/CSS

### Backend

* FastAPI
* SQLite
* Pandas
* Groq API (LLaMA 3.3 70B)
* Uvicorn

---

# Prerequisites

Before running the project, ensure the following are installed:

* Node.js (v18+ recommended)
* npm
* Python 3.10+
* pip
* Virtual Environment (`venv`)
* FastAPI
* Uvicorn

---

# Project Structure

```text
project-root/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routers/
│   ├── data/
│   ├── main.py
│   ├── seed.py
│   └── requirements.txt
│
└── README.md
```

---

# Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Backend Setup

## 1. Create and Activate Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 2. Install Dependencies

Using requirements file:

```bash
pip install -r requirements.txt
```

Or manually:

```bash
pip install fastapi uvicorn pandas requests pydantic
```

---

## 3. Configure Environment Variables

### Windows

```bash
set GROQ_API_KEY=your_api_key_here
```

### macOS / Linux

```bash
export GROQ_API_KEY="your_api_key_here"
```

Optional:

```bash
export GROQ_MODEL="llama-3.3-70b-versatile"
```

---

## 4. Start Backend Server

### Option 1: FastAPI CLI

```bash
fastapi dev main.py
```

### Option 2: Uvicorn

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

# Application URLs

| Service           | URL                        |
| ----------------- | -------------------------- |
| Frontend          | http://localhost:5173      |
| Backend API       | http://localhost:8000      |
| API Documentation | http://localhost:8000/docs |

---

# Development Workflow

1. Start the backend server.
2. Start the frontend development server.
3. Open the frontend URL in your browser.
4. Verify backend connectivity via Swagger docs.
5. Use the dashboard and AI chat assistant to explore sales data.

---

# Features

## Dashboard Analytics

* Revenue tracking
* Profit analysis
* Sales trend visualization
* Product performance analysis
* Regional sales breakdown
* Channel performance metrics

## AI Business Assistant

Ask questions such as:

* Which region generated the highest revenue?
* What was the best-performing product?
* Show quarterly revenue trends.
* Compare sales channels.
* Identify top sales representatives.

Responses are generated using Groq-hosted LLaMA models and real business data.

---

# LLM Integration

## Model

```text
llama-3.3-70b-versatile
```

Powered by Groq.

## Why Groq?

* Free tier available
* Very low latency
* Strong reasoning capabilities
* OpenAI-compatible API
* Easy model replacement

The model can be changed using:

```bash
GROQ_MODEL=<model-name>
```

---

# Chat Endpoint Prompt Design

The `/api/chat` endpoint follows a two-layer prompt structure.

## System Prompt

The system prompt injects pre-computed business metrics into the model context:

```text
You are a precise business analyst assistant for NovaBite...
Use ONLY the provided business data.
Provide concise and accurate answers.
```

The context includes:

* Overall KPIs
* Revenue by Region
* Revenue by Channel
* Product Category Metrics
* Quarterly Regional Trends
* Top Products by Region
* Top Sales Representatives

## User Prompt

The user's question is passed directly as the user message.

Example:

```text
Which region generated the highest revenue in 2025?
```

---

# Generation Parameters

| Parameter   | Value |
| ----------- | ----- |
| temperature | 0.2   |
| max_tokens  | 1024  |

Low temperature helps maintain deterministic and factual business responses.

---

# API Endpoints

| Method | Endpoint      | Description                      |
| ------ | ------------- | -------------------------------- |
| GET    | /check        | Health Check                     |
| GET    | /api/products | Product revenue and unit metrics |
| GET    | /api/summary  | Overall KPI summary              |
| GET    | /api/trends   | Monthly trends and chart data    |
| POST   | /api/chat     | Natural language business Q&A    |

---

# Environment Variables

| Variable     | Required | Default                 |
| ------------ | -------- | ----------------------- |
| GROQ_API_KEY | Yes      | None                    |
| GROQ_MODEL   | No       | llama-3.3-70b-versatile |

---

# Troubleshooting

## Upgrade Pip

```bash
python -m pip install --upgrade pip
```

## Port Already In Use

Run backend on another port:

```bash
uvicorn main:app --port 8001 --reload
```

Or terminate the process currently using the port.

## Missing GROQ_API_KEY

Ensure the environment variable is configured before starting the server:

```bash
echo $GROQ_API_KEY
```

Windows:

```bash
echo %GROQ_API_KEY%
```

---

# Future Improvements

* Dynamic Text-to-SQL generation
* Streaming AI responses
* Multi-turn conversation memory
* Query result caching
* Input validation and guardrails
* Production-ready database migrations
* Authentication and authorization
* Role-based access control

---

# Tradeoffs and Shortcuts

| Decision                        | Impact                                                 |
| ------------------------------- | ------------------------------------------------------ |
| Pre-aggregated prompt context   | Simple and reliable but limits query flexibility       |
| Database replacement on startup | Easy demo setup but unsuitable for production          |
| Synchronous Groq requests       | Simpler implementation but blocks the event loop       |
| Open CORS policy                | Convenient for development but insecure for production |
| No authentication               | Simplifies demo usage but lacks security               |
| Hardcoded CSV path              | Easier setup but less portable                         |

---


