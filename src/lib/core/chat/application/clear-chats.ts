import { ChatRepository } from "../domain/chat-repository";

export class ClearChats {
  constructor(private chatRepository: ChatRepository) {}

  async execute(userId: string): Promise<void> {
    if (!userId) {
      throw new Error("User ID is required to clear chats.");
    }

    await this.chatRepository.clear(userId);
  }
}
