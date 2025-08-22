import { DomainError } from "@/contexts/shared/domain/domain-error";

export class ChatNotFoundError extends DomainError {
  constructor(chatId: string) {
    super(`Chat with ID ${chatId} not found.`);
  }
}
