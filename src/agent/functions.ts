import { SaveChat } from "@/lib/core/chat/application/save-chat";
import { Chat } from "@/lib/core/chat/domain/chat";
import { RedisChatRepository } from "@/lib/core/chat/infrastructure/redis-chat-repository";
import { TextPart } from "ai";
import { ChatMessage } from ".";

export async function saveChat(chatId: string, userId: string, messages: ChatMessage[]) {
  const createdAt = new Date();

  const firstMessageContent = (messages?.at(0)?.parts.at(0) as TextPart).text || "No content";
  const title =
    typeof firstMessageContent === "string" ? firstMessageContent.substring(0, 100) : "";

  const chat: Chat = {
    id: chatId,
    userId,
    title,
    createdAt,
    messages,
  };

  const service = new SaveChat(new RedisChatRepository());
  await service.execute(chat);
}
