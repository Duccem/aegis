import { agent } from "@/agent";
import { ClearChats } from "@/lib/core/chat/application/clear-chats";
import { ListChats } from "@/lib/core/chat/application/list-chats";
import { RedisChatRepository } from "@/lib/core/chat/infrastructure/redis-chat-repository";
import { routeHandler } from "@/lib/http/route-handler";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { messages, chatId, user } = await request.json();
  return agent(messages, chatId, user);
};

export const GET = routeHandler({ name: "list-chats" }, async ({ user }) => {
  const service = new ListChats(new RedisChatRepository());

  const chats = await cache(() => service.execute(user.id), ["list-chats", user.id], {
    tags: [`user:chats:${user.id}`],
    revalidate: 60 * 60, // Cache for 1 hour
  })();
  return NextResponse.json(
    {
      data: chats,
      message: "Chats retrieved successfully",
      success: true,
    },
    { status: 200 }
  );
});

export const DELETE = routeHandler({ name: "clear-chats" }, async ({ user }) => {
  const service = new ClearChats(new RedisChatRepository());

  await service.execute(user.id);

  return NextResponse.json(
    {
      message: "Chats deleted successfully",
      success: true,
    },
    { status: 200 }
  );
});
