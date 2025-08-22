import { cache } from "@/contexts/shared/infrastructure/upstash/cache";
import { Chat } from "../domain/chat";
import { ChatRepository } from "../domain/chat-repository";

export class RedisChatRepository implements ChatRepository {
  async save(chat: Chat): Promise<void> {
    const userKey = `chat:user:${chat.userId}`;
    const chatKey = `chat:${chat.id}`;

    const pipeline = cache.pipeline();

    pipeline.hmset(chatKey, chat);
    pipeline
      .zadd(userKey, { score: Date.now(), member: chatKey })
      .expire(userKey, 60 * 60 * 24 * 30);

    await pipeline.exec();
  }

  async find(id: string): Promise<Chat | null> {
    const chatKey = `chat:${id}`;
    const chat = await cache.hgetall<Chat>(chatKey);
    return chat;
  }

  async list(userId: string): Promise<Chat[]> {
    const userKey = `chat:user:${userId}`;

    const pipeline = cache.pipeline();

    const chatKeys: string[] = await pipeline.zrange(userKey, 0, -1, { rev: true }).exec();

    if (chatKeys.length === 0) {
      return [];
    }
    const chatPipeline = cache.pipeline();

    for (const chat of chatKeys.at(0) ?? []) {
      chatPipeline.hgetall(chat);
    }

    const results = await chatPipeline.exec();

    return results as Chat[];
  }

  async delete(id: string): Promise<void> {
    const chatKey = `chat:${id}`;

    const userKey = `chat:user:${id}`;

    const pipeline = cache.pipeline();

    pipeline.del(chatKey);
    pipeline.zrem(userKey, chatKey);
  }

  async clear(userId: string): Promise<void> {
    const userKey = `chat:user:${userId}`;

    const chats: string[] = await cache.zrange(userKey, 0, -1);

    if (chats.length === 0) {
      return;
    }

    const pipeline = cache.pipeline();

    for (const chat of chats) {
      pipeline.del(chat);
      pipeline.zrem(userKey, chat);
    }

    await pipeline.exec();
  }

  async count(userId: string): Promise<number> {
    const userKey = `chat:user:${userId}`;
    const count = await cache.zcard(userKey);
    return count;
  }
}
