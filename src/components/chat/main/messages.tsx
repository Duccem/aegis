"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ChatAvatar } from "./chat-avatar";

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start">
      <div className="flex p-2 border rounded-full shrink-0 select-none items-center justify-center">
        <ChatAvatar role="user" />
      </div>

      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2  leading-relaxed mt-2">
        {children}
      </div>
    </div>
  );
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start">
      <div className="flex p-2 shrink-0 select-none items-center justify-center">
        <ChatAvatar role="assistant" />
      </div>

      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
}

export function BotMessage({ content }: { content: string }) {
  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <div className="group relative flex items-start">
        <div className="flex shrink-0 select-none items-center justify-center border rounded-full p-2">
          <ChatAvatar role="assistant" />
        </div>

        <div className="ml-4 flex-1 overflow-hidden pl-2 mt-2">{content}</div>
      </div>
    </ErrorBoundary>
  );
}

export function BotCard({
  children,
  showAvatar = true,
  className,
}: {
  children?: React.ReactNode;
  showAvatar?: boolean;
  className?: string;
}) {
  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <div className="group relative flex items-start">
        <div className="flex  shrink-0 select-none items-center justify-center border rounded-full p-2">
          {showAvatar && <ChatAvatar role="assistant" />}
        </div>

        <div
          className={cn(
            "ml-4 flex-1 space-y-2 overflow-hidden pl-2 font-mono leading-relaxed mt-2",
            className
          )}
        >
          {children}
        </div>
      </div>
    </ErrorBoundary>
  );
}

function ErrorFallback() {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded">
      <p>Something went wrong while rendering this message.</p>
    </div>
  );
}
