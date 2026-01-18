import classNames from "classnames";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { type Message } from "../types/index";

type Props = {
  message: Message;
};

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={classNames(
        "w-fit max-w-[85%] mt-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "self-end" : "self-start"
      )}
    >
      <div
        className={classNames(
          "px-4 py-3 rounded-2xl text-[14px] leading-relaxed",
          "shadow-[var(--shadow)]",
          isUser
            ? "bg-[var(--primary)] text-white rounded-br-md"
            : "bg-white text-[var(--text)] border border-[var(--border)] rounded-bl-md"
        )}
      >
        <Markdown
          remarkPlugins={[remarkGfm]}
          children={message.content}
          components={{
            code(props) {
              const { children, className, node: _node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");

              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={atomDark}
                  customStyle={{
                    borderRadius: "8px",
                    margin: "8px 0",
                    fontSize: "13px",
                  }}
                />
              ) : (
                <code
                  {...rest}
                  className={classNames(
                    className,
                    "bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[13px] font-mono"
                  )}
                >
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            ul({ children }) {
              return <ul className="list-disc ml-4 mb-2">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="list-decimal ml-4 mb-2">{children}</ol>;
            },
          }}
        />
      </div>
    </div>
  );
}
