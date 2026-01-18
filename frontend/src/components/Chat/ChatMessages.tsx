import { useEffect, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import MessageBubble from "../MessageBubble";
import { type Message } from "../../types";

type Props = {
  messages: Message[];
  loading: boolean;
};

export default function ChatMessages({ messages, loading }: Props) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-4 min-h-0">
      {messages.length === 0 && !loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[var(--primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-[var(--text-muted)] text-sm">
              Start a conversation
            </p>
          </div>
        </div>
      )}

      {messages.map((message) => {
        // Don't render empty streaming messages - show ThreeDots instead
        if (message.role === "assistant" && message.content === "") {
          return (
            <div key={message.id} className="self-start mt-3">
              <div className="bg-white border border-[var(--border)] rounded-2xl rounded-bl-md px-4 py-3 shadow-[var(--shadow)]">
                <ThreeDots
                  visible={true}
                  height="20"
                  width="40"
                  color="var(--primary)"
                  radius="9"
                  ariaLabel="three-dots-loading"
                />
              </div>
            </div>
          );
        }
        return <MessageBubble key={message.id} message={message} />;
      })}

      <div ref={messagesEndRef} />
    </div>
  );
}
