import { ChatRepository } from "../domain/chat-repository";

export class DeleteChat {
  constructor(private chatRepository: ChatRepository) {}

  async execute(chatId: string): Promise<void> {
    if (!chatId) {
      throw new Error("Chat ID is required to delete a chat.");
    }

    await this.chatRepository.delete(chatId);
  }
}
