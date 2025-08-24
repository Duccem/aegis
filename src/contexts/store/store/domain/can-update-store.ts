import { Specification } from "@/contexts/shared/domain/specification";
import { Store } from "./store";

export class CanUpdateStore extends Specification<Store> {
  constructor(private readonly organizationId: string) {
    super();
  }

  isSatisfiedBy(store: Store): boolean {
    return store.organizationId.value === this.organizationId;
  }

  static forOrganization(organizationId: string): CanUpdateStore {
    return new CanUpdateStore(organizationId);
  }
}
