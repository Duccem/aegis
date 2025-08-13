import { DomainError } from "@/lib/types/domain-error";

export class OrganizationNotFound extends DomainError {
  constructor(id: string) {
    super(`Organization with ID <${id}> not found.`);
  }
}
