import { Specification } from "@/contexts/shared/domain/specification";
import { Item } from "../item";

export class CanUpdateItem extends Specification<Item> {
  constructor(private readonly organizationId: string) {
    super();
  }

  isSatisfiedBy(candidate: Item): boolean {
    return candidate.organizationId.getValue() === this.organizationId;
  }

  static forOrganization(organizationId: string): CanUpdateItem {
    return new CanUpdateItem(organizationId);
  }
}
