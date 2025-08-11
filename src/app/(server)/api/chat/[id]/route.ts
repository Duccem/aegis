import { DeleteChat } from "@/lib/core/chat/application/delete-chat";
import { GetChat } from "@/lib/core/chat/application/get-chat";
import { RedisChatRepository } from "@/lib/core/chat/infrastructure/redis-chat-repository";
import { routeHandler } from "@/lib/http/route-handler";
import { NextResponse } from "next/server";
import z from "zod";

export const GET = routeHandler(
  { name: "get-chat", paramsSchema: z.object({ id: z.string() }) },
  async ({ params }) => {
    const service = new GetChat(new RedisChatRepository());
    const chat = await service.execute(params.id);
    return NextResponse.json(
      {
        data: chat,
        message: `Chat with ID ${params.id} retrieved successfully`,
        success: true,
      },
      { status: 200 }
    );
  }
);

export const DELETE = routeHandler(
  { name: "delete-chat", paramsSchema: z.object({ id: z.string() }) },
  async ({ params }) => {
    const service = new DeleteChat(new RedisChatRepository());
    await service.execute(params.id);
    return NextResponse.json(
      {
        message: `Chat with ID ${params.id} deleted successfully`,
        success: true,
      },
      { status: 200 }
    );
  }
);
