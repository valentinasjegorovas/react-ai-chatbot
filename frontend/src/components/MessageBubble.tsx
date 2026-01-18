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
  return (
    <div
      className={classNames(
        message.role === "user"
          ? "bg-[#fbfaf6] self-start"
          : "bg-[#4c7f49] text-white self-end",
        "w-fit p-2 text-[14px] leading-[20px] rounded-lg font-medium max-w-[80%] mt-3",
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
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
}
