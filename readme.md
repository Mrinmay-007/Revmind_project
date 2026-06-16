#  Project Setup Guide

## Prerequisites

Before starting, ensure the following are installed on your system:

* Node.js (v18+ recommended)
* npm
* Python 3.10+
* pip
* Virtual Environment (`venv`)
* FastAPI
* Uvicorn

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

The frontend application will be available at:

```text
http://localhost:5173
```

---

# Backend Setup

## 1. Create and Activate a Virtual Environment

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

```bash
pip install -r requirements.txt
```

---

## 3. Run the FastAPI Server

### Option 1: Using FastAPI CLI

```bash
fastapi dev main.py
```

### Option 2: Using Uvicorn

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
4. Verify API connectivity through the FastAPI documentation endpoint.

---

# Troubleshooting

### Dependency Installation Issues

Upgrade pip before installing packages:

```bash
python -m pip install --upgrade pip
```

### Port Already in Use

Run the backend on a different port:

```bash
uvicorn main:app --port 8001 --reload
```

Or stop the process currently using the port.

---

# Tech Stack

* Frontend: React / Vite
* Backend: FastAPI
* Server: Uvicorn
* Package Manager: npm & pip
