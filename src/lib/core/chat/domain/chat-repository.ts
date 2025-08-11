import { Chat } from "./chat";

export interface ChatRepository {
  save(chat: Chat): Promise<void>;
  find(id: string): Promise<Chat | null>;
  list(userId: string): Promise<Chat[]>;
  delete(id: string): Promise<void>;
  clear(userId: string): Promise<void>;
  count(userId: string): Promise<number>;
}
