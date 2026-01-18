import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import { useChat } from "../hooks/useChat";
import { ChatMessages, ChatInput } from "./Chat";

export default function App() {
  const { messages, loading, error, isConnected, sendMessage, clearChat } = useChat();

  return (
    <div className="h-dvh bg-[var(--background)] p-4 sm:p-6 flex flex-col">
      <div className="max-w-[480px] w-full mx-auto flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-semibold text-[var(--text)]">
                Chat Assistant
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                Ask me anything
              </p>
            </div>
            {/* Connection indicator */}
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
              title={isConnected ? "Connected" : "Disconnected"}
            />
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100"
            >
              Clear chat
            </button>
          )}
        </div>

        {/* Chat Container - fills remaining space */}
        <div className="bg-white rounded-2xl shadow-[var(--shadow-lg)] border border-[var(--border)] overflow-hidden flex flex-col flex-1 min-h-0">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-b border-red-100 text-red-600 px-4 py-3 text-sm shrink-0">
              {error}
            </div>
          )}

          {/* Messages - fills remaining space */}
          <ChatMessages messages={messages} loading={loading} />

          {/* Input - fixed at bottom */}
          <div className="border-t border-[var(--border)] p-4 bg-slate-50/50 shrink-0">
            <ChatInput onSend={sendMessage} loading={loading} />
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[var(--text-muted)] mt-4 shrink-0">
          Powered by OpenAI
        </p>
      </div>
    </div>
  );
}
