import { Criteria, FilterType, Operator } from "@/contexts/shared/domain/criteria";

export class FilterById extends Criteria {
  constructor(id: string) {
    super({
      filters: [{ field: "id", operator: Operator.EQUAL, value: id }],
      type: FilterType.AND,
    });
  }

  static fromString(id: string): FilterById {
    return new FilterById(id);
  }
}
