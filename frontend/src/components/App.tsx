import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ThreeDots, TailSpin } from "react-loader-spinner";
import MessageBubble from "./MessageBubble";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";
import Input from "./Input";
import Button from "./Button";
import useLocalStorage from "../hooks/useLocalStorage";
import { type Messages, type Message } from "../types/index";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const context: Messages = [
  { id: "system-1", role: "developer", content: "act like a buddie" },
];

export default function App() {
  const [messages, setMessages] = useLocalStorage("chat", context);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = useCallback(async () => {
  
    if (!text.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: text,
    };

   
    const history = [...messages, userMessage];

    setMessages(history);
    setText("");

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/chat`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(history),
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(
          `Something went wrong, status: ${res.status}, status text: ${res.statusText}`
        );
      }

      const data = await res.json();

      if (data.status === 400) {
        throw new Error(data.error?.message || "Bad request");
      }

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.content,
      };

      setMessages((prev: Messages) => [...prev, assistantMessage]);
    } catch (error) {
     
      console.error("Chat error:", error);

      
    } finally {
      setLoading(false);
    }
  }, [text, messages, setMessages]);

  useEffect(() => {
    if (!text.trim()) return;

    function listener(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "enter")  sendMessage();
    }

    window.addEventListener("keydown", listener);

    
    return () => window.removeEventListener("keydown", listener);
  }, [text, sendMessage]);

 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  const filteredMessages = messages.filter(
    (message: Message) => message.role !== "developer"
  );

  return (
    <div className="p-5">
      <div className="max-w-[400px] w-full mx-auto">
        <div className="h-[calc(100dvh-148px)] flex flex-col overflow-auto pb-5">
          {filteredMessages.map((message: Message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {loading && (
            <ThreeDots
              visible={true}
              height="30"
              width="30"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass="self-end"
            />
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="space-y-3">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
          />
          <Button disabled={!text.trim() || loading} onClick={sendMessage}>
            {loading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                strokeWidth={5}
              />
            ) : (
              "Send"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
