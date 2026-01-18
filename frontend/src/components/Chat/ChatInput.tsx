import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
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

  // Enter key to send
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
    <div className="space-y-3">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <Button disabled={!text.trim() || loading} onClick={handleSend}>
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
  );
}
