"use client";
import { useSession } from "@/components/auth/session-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

type Props = {
  role: "assistant" | "user";
};
export function ChatAvatar({ role }: Props) {
  const { user } = useSession();
  switch (role) {
    case "user": {
      return (
        <Avatar className="size-6">
          <AvatarImage src={user?.image!} alt={user?.name} className="object-contain" />
          <AvatarFallback>
            {user?.name
              .split(" ")
              .map((n: any) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      );
    }

    default:
      return <Bot className="size-6" />;
  }
}
