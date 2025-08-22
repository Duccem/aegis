import { Meta } from "@/contexts/shared/domain/collection";
import { Criteria, Filter, Operator, Order, Pagination } from "@/contexts/shared/domain/criteria";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { Item } from "../domain/item";
import { ItemRepository } from "../domain/item-repository";

type ItemFilters = {
  organizationId: string;
  query?: string;
};

export class ListItems {
  constructor(private readonly repository: ItemRepository) {}

  async execute(
    filters: ItemFilters,
    order: Order,
    pagination: Pagination,
  ): Promise<{ items: Primitives<Item>[]; meta: Meta }> {
    const criteria = this.buildCriteria(filters)
      .orderBy(order.field, order.order)
      .paginate(pagination.limit, pagination.offset);

    const [items, count] = await Promise.all([
      this.repository.search(criteria),
      this.repository.count(criteria),
    ]);

    return {
      items: items.map((item) => item.toPrimitives()),
      meta: criteria.buildMeta(count),
    };
  }

  private buildCriteria(filters: ItemFilters): Criteria {
    let newFilters: Filter[] = [];

    newFilters.push({
      field: "organizationId",
      value: filters.organizationId,
      operator: Operator.EQUAL,
    });

    if (filters.query) {
      newFilters = [
        ...newFilters,
        { field: "name", value: filters.query, operator: Operator.CONTAINS },
      ];
    }

    return Criteria.withFilters(newFilters);
  }
}
