import { DomainError } from "@/lib/types/domain-error";

export class ChatNotFoundError extends DomainError {
  constructor(chatId: string) {
    super(`Chat with ID ${chatId} not found.`);
  }
}
