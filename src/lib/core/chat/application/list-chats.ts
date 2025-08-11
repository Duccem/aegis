import { Chat } from "../domain/chat";
import { ChatRepository } from "../domain/chat-repository";

export class ListChats {
  constructor(private chatRepository: ChatRepository) {}

  async execute(userId: string): Promise<Chat[]> {
    if (!userId) {
      throw new Error("User ID is required to list chats.");
    }

    return await this.chatRepository.list(userId);
  }
}
