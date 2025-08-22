import { ClearChats } from "@/contexts/assistant/chat/application/clear-chats";
import { ListChats } from "@/contexts/assistant/chat/application/list-chats";
import { agent } from "@/contexts/assistant/chat/infrastructure/agent";
import { RedisChatRepository } from "@/lib/core/chat/infrastructure/redis-chat-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { messages, chatId, user } = await request.json();
  console.log("Messages received in route:", messages, chatId, user);
  return agent(messages, chatId, user);
};

export const GET = routeHandler({ name: "list-chats" }, async ({ user }) => {
  const service = new ListChats(new RedisChatRepository());
  const chats = await service.execute(user.id);
  return HttpNextResponse.json({
    data: chats,
    message: "Chats retrieved successfully",
    success: true,
  });
});

export const DELETE = routeHandler({ name: "clear-chats" }, async ({ user }) => {
  const service = new ClearChats(new RedisChatRepository());

  await service.execute(user.id);

  return HttpNextResponse.noResponse(204);
});
