// api.js

const BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

async function get(path) {
  const res = await fetch(`${BASE}${path}`);

  if (!res.ok) {
    throw new Error(
      `API error ${res.status}: ${await res.text()}`
    );
  }

  return res.json();
}

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(
      `API error ${res.status}: ${await res.text()}`
    );
  }

  return res.json();
}

export const api = {
  getSummary: () => get("/summary"),
  getTrends: () => get("/trends"),
  getProducts: () => get("/products"),
  chat: (question) => post("/chat", { question }),
};