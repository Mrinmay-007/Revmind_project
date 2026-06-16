

import { useState, useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat";

import styles from "./ChatInterface.module.css";

const SUGGESTED_QUESTIONS = [
  "What was the top region in 2025?",
  "Which product generated the most revenue?",
  "What is the gross profit margin?",
  "Show top sales channels",
];

function TypingIndicator() {
  return (
    <div
      className={styles.typing}
      aria-label="NovaBite AI is thinking"
    >
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  );
}

function Message({ role, text, loading }) {
  const isAI = role === "ai";

  return (
    <div
      className={`${styles.msg} ${
        isAI ? styles.ai : styles.user
      }`}
    >
      {isAI && (
        <div
          className={styles.avatar}
          aria-hidden="true"
        >
          N
        </div>
      )}

      <div className={styles.bubble}>
        {loading ? (
          <TypingIndicator />
        ) : (
          <p className={styles.text}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ChatInterface() {
  const { loading, askQuestion } =
    useChat();

  const [messages, setMessages] =
    useState([
      {
        id: 1,
        role: "ai",
        text: "Hi! I'm your NovaBite insights assistant. Ask me anything about sales performance, regions, channels, products, or revenue trends.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function ask(question) {
    if (
      !question.trim() ||
      loading
    ) {
      return;
    }

    const q = question.trim();

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        text: q,
      },
    ]);

    const answer =
      await askQuestion(q);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "ai",
        text: answer,
      },
    ]);

    inputRef.current?.focus();
  }

  function onKeyDown(e) {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      ask(input);
    }
  }

  return (
    <div className={styles.wrap}>
      {/* Messages */}
      <div
        className={styles.messages}
        role="log"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <Message
            key={msg.id}
            role={msg.role}
            text={msg.text}
          />
        ))}

        {loading && (
          <Message
            role="ai"
            loading
          />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div
        className={styles.suggestions}
        aria-label="Suggested questions"
      >
        {SUGGESTED_QUESTIONS.map(
          (q) => (
            <button
              key={q}
              className={
                styles.chip
              }
              onClick={() =>
                ask(q)
              }
              disabled={loading}
            >
              {q}
            </button>
          )
        )}
      </div>

      {/* Input */}
      <div className={styles.inputRow}>
        <textarea
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={(e) =>
            setInput(
              e.target.value
            )
          }
          onKeyDown={onKeyDown}
          placeholder="Ask about revenue, products, regions..."
          rows={1}
          disabled={loading}
          aria-label="Your question"
        />

        <button
          className={
            styles.sendBtn
          }
          onClick={() =>
            ask(input)
          }
          disabled={
            loading ||
            !input.trim()
          }
        >
          {loading
            ? "Thinking..."
            : "Ask"}
        </button>
      </div>
    </div>
  );
}