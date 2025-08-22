import { Chat } from "../../../../lib/core/chat/domain/chat";
import { ChatRepository } from "../../../../lib/core/chat/domain/chat-repository";

export class SaveChat {
  constructor(private readonly repository: ChatRepository) {}
  async execute(chat: Chat) {
    return this.repository.save(chat);
  }
}
