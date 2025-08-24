import { DomainError } from "@/contexts/shared/domain/domain-error";

export class StoreNotFound extends DomainError {
  constructor(id: string) {
    super(`Store with id ${id} not found`);
  }
}
