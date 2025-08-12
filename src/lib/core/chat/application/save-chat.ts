import { Chat } from "../domain/chat";
import { ChatRepository } from "../domain/chat-repository";

export class SaveChat {
  constructor(private readonly repository: ChatRepository) {}
  async execute(chat: Chat) {
    return this.repository.save(chat);
  }
}
