import { DeleteChat } from "@/contexts/assistant/chat/application/delete-chat";
import { GetChat } from "@/contexts/assistant/chat/application/get-chat";
import { RedisChatRepository } from "@/lib/core/chat/infrastructure/redis-chat-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
import z from "zod";

export const GET = routeHandler(
  { name: "get-chat", paramsSchema: z.object({ id: z.string() }) },
  async ({ params }) => {
    const service = new GetChat(new RedisChatRepository());
    const chat = await service.execute(params.id);
    return HttpNextResponse.json({
      data: chat,
      message: `Chat with ID ${params.id} retrieved successfully`,
      success: true,
    });
  },
);

export const DELETE = routeHandler(
  { name: "delete-chat", paramsSchema: z.object({ id: z.string() }) },
  async ({ params }) => {
    const service = new DeleteChat(new RedisChatRepository());
    await service.execute(params.id);
    return HttpNextResponse.noResponse(204);
  },
);
