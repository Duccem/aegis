import { Chat } from "../../../../lib/core/chat/domain/chat";
import { ChatRepository } from "../../../../lib/core/chat/domain/chat-repository";

export class GetChat {
  constructor(private chatRepository: ChatRepository) {}

  async execute(chatId: string): Promise<Chat | null> {
    if (!chatId) {
      throw new Error("Chat ID is required to retrieve a chat.");
    }
    const chat = await this.chatRepository.find(chatId);
    if (!chat) {
      throw new Error(`Chat with ID ${chatId} not found.`);
    }
    return chat;
  }
}
