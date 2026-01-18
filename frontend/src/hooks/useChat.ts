import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { sendChatMessage } from "../api/chat";
import useLocalStorage from "./useLocalStorage";
import { type Messages, type Message } from "../types";

const DEFAULT_CONTEXT: Messages = [
  { id: "system-1", role: "developer", content: "act like a buddie" },
];

export function useChat() {
  const [messages, setMessages] = useLocalStorage("chat", DEFAULT_CONTEXT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

   
      setError(null);

      const userMessage: Message = {
        id: uuidv4(),
        role: "user",
        content: text,
      };

      const history = [...messages, userMessage];

  
      setMessages(history);

      try {
        setLoading(true);

        const response = await sendChatMessage(history);

        const assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: response.content,
        };

        setMessages((prev: Messages) => [...prev, assistantMessage]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        setError(errorMessage);
        console.error("Chat error:", err);
      } finally {
        setLoading(false);
      }
    },
    [messages, setMessages]
  );

  const clearChat = useCallback(() => {
    setMessages(DEFAULT_CONTEXT);
    setError(null);
  }, [setMessages]);

  const visibleMessages = messages.filter(
    (message: Message) => message.role !== "developer"
  );

  return {
    messages: visibleMessages,
    allMessages: messages,
    loading,
    error,
    sendMessage,
    clearChat,
  };
}
