import { type Messages } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export type ChatResponse = {
  role: "assistant";
  content: string;
};

export type ChatError = {
  error: string;
};

export async function sendChatMessage(messages: Messages): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}
