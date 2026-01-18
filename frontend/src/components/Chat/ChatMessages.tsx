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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  return (
    <div className="h-[calc(100dvh-148px)] flex flex-col overflow-auto pb-5">
      {messages.map((message) => (
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
  );
}
