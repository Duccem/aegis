import { DomainError } from "@/contexts/shared/domain/domain-error";

export class CannotUpdateBrandError extends DomainError {
  constructor() {
    super(
      "Cannot update brand. The brand may not exist or the user does not have permission to update it.",
    );
  }
}
