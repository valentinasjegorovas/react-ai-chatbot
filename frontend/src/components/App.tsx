import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";
import { useChat } from "../hooks/useChat";
import { ChatMessages, ChatInput } from "./Chat";


export default function App() {
  const { messages, loading, error, sendMessage } = useChat();

  return (
    <div className="p-5">
      <div className="max-w-[400px] w-full mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <ChatMessages messages={messages} loading={loading} />
        <ChatInput onSend={sendMessage} loading={loading} />
      </div>
    </div>
  );
}
