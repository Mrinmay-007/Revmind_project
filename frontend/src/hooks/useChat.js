import { useState } from "react";
import { api } from "../api/api";

export function useChat() {
  const [loading, setLoading] = useState(false);

  const askQuestion = async (question) => {
    if (!question?.trim()) {
      return "Please enter a question.";
    }

    setLoading(true);

    try {
      const response = await api.chat(question);

      return (
        response?.answer ||
        "No response received from server."
      );
    } catch (error) {
      console.error("Chat Error:", error);

      return "Something went wrong. Please check your backend connection.";
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    askQuestion,
  };
}