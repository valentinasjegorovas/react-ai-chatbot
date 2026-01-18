import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { io, Socket } from "socket.io-client";
import useLocalStorage from "./useLocalStorage";
import { type Messages, type Message } from "../types";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const INITIAL_MESSAGES: Messages = [];


export function useChat() {
  const [messages, setMessages] = useLocalStorage("chat", INITIAL_MESSAGES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Refs to track current streaming state
  const socketRef = useRef<Socket | null>(null);
  const streamingMessageIdRef = useRef<string | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    // Connection events
    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    // Chat streaming events
    socket.on("chat:start", () => {
      // Create empty assistant message that we'll fill with tokens
      const messageId = uuidv4();
      streamingMessageIdRef.current = messageId;

      const emptyAssistantMessage: Message = {
        id: messageId,
        role: "assistant",
        content: "",
      };

      setMessages((prev: Messages) => [...prev, emptyAssistantMessage]);
    });

    socket.on("chat:token", ({ content }: { content: string }) => {
      // Append token to the current streaming message
      const messageId = streamingMessageIdRef.current;
      if (!messageId) return;

      setMessages((prev: Messages) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, content: msg.content + content }
            : msg
        )
      );
    });

    socket.on("chat:end", () => {
      // Streaming complete
      streamingMessageIdRef.current = null;
      setLoading(false);
    });

    socket.on("chat:error", ({ message }: { message: string }) => {
      setError(message);
      setLoading(false);
      streamingMessageIdRef.current = null;
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [setMessages]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || !socketRef.current || loading) return;

      setError(null);

      // Create user message
      const userMessage: Message = {
        id: uuidv4(),
        role: "user",
        content: text,
      };

      // Add user message to history
      const history = [...messages, userMessage];
      setMessages(history);

      // Start loading
      setLoading(true);

      // Send to server via WebSocket
      socketRef.current.emit("chat:send", history);
    },
    [messages, setMessages, loading]
  );

  const clearChat = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    setError(null);
  }, [setMessages]);

  return {
    messages,
    loading,
    error,
    isConnected,
    sendMessage,
    clearChat,
  };
}
