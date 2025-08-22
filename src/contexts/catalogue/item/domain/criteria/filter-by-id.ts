import { Criteria, FilterType, Operator } from "@/contexts/shared/domain/criteria";

export class FilterItemById extends Criteria {
  constructor(productId: string) {
    super({
      filters: [{ field: "id", operator: Operator.EQUAL, value: productId }],
      type: FilterType.AND,
    });
  }

  static fromString(productId: string): FilterItemById {
    return new FilterItemById(productId);
  }
}
