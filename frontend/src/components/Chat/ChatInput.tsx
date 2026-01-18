import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

type Props = {
  onSend: (text: string) => void;
  loading: boolean;
};

export default function ChatInput({ onSend, loading }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || loading) return;
    onSend(text);
    setText("");
  };

  useEffect(() => {
    if (!text.trim()) return;

    function listener(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "enter") {
        handleSend();
      }
    }

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [text, loading]);

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
        />
      </div>
      <Button
        disabled={!text.trim() || loading}
        onClick={handleSend}
        className="!w-12 !rounded-xl shrink-0"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        )}
      </Button>
    </div>
  );
}
