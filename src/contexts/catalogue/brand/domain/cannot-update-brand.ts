import { DomainError } from "@/lib/types/domain-error";

export class CannotUpdateBrandError extends DomainError {
  constructor() {
    super(
      "Cannot update brand. The brand may not exist or the user does not have permission to update it.",
    );
  }
}
