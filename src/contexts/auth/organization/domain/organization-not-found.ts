import { DomainError } from "@/contexts/shared/domain/domain-error";

export class OrganizationNotFound extends DomainError {
  constructor(id: string) {
    super(`Organization with ID <${id}> not found.`);
  }
}
