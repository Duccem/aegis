"use client";

import { cn } from "@/contexts/shared/ui/utils/utils";
import { UIMessage } from "ai";
import { BotMessage, UserMessage } from "./messages";

type Props = {
  messages: UIMessage[];
  className?: string;
};

export function ChatList({ messages, className }: Props) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-col select-text gap-2", className)}>
      {messages.map((message) => (
        <div key={message.id} className="mb-2">
          {message.parts.map((part, index) => {
            switch (part.type) {
              case "text":
                if (message.role === "user") {
                  return <UserMessage key={index}>{part.text}</UserMessage>;
                } else if (message.role === "assistant") {
                  return <BotMessage key={index} content={part.text} />;
                }
                return null;
              case "reasoning":
                return <BotMessage key={index} content={part.text} />;
              default:
                return null;
            }
          })}
        </div>
      ))}
    </div>
  );
}
