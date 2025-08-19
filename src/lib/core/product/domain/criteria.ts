import { Criteria, FilterType, Operator } from "@/lib/types/criteria";

export class FilterByProductId extends Criteria {
  constructor(productId: string) {
    super({
      filters: [{ field: "id", operator: Operator.EQUAL, value: productId }],
      type: FilterType.AND,
    });
  }

  static fromString(productId: string): FilterByProductId {
    return new FilterByProductId(productId);
  }
}
