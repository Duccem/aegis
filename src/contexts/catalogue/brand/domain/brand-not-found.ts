import { DomainError } from "@/contexts/shared/domain/domain-error";

export class BrandNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Brand with ID <${id}> not found.`);
  }
}
