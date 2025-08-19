import { Specification } from "@/lib/types/specification";
import { Product } from "./product";

export class CanUpdateProduct extends Specification<Product> {
  constructor(private readonly organizationId: string) {
    super();
  }

  isSatisfiedBy(candidate: Product): boolean {
    return candidate.organizationId.getValue() === this.organizationId;
  }

  static forOrganization(organizationId: string): CanUpdateProduct {
    return new CanUpdateProduct(organizationId);
  }
}
