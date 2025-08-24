import { DomainError } from "@/contexts/shared/domain/domain-error";

export class StoreNameExist extends DomainError {
  constructor(name: string, organizationId: string) {
    super(`Store with name ${name} already exists in organization ${organizationId}`);
  }
}
