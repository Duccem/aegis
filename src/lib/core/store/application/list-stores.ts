import { Criteria, Filter, Operator, Order, Pagination } from "@/lib/types/criteria";
import { StoreRepository } from "../domain/store-repository";

export type StoreFilters = {
  query?: string;
  organizationId: string;
};

export class ListStores {
  constructor(private readonly repository: StoreRepository) {}

  async execute(filters: StoreFilters, order: Order, pagination: Pagination) {
    const criteria = this.buildCriteria(filters)
      .orderBy(order.field, order.order)
      .paginate(pagination.limit, pagination.offset);
    const [stores, count] = await Promise.all([
      this.repository.search(criteria),
      this.repository.count(criteria),
    ]);

    return {
      items: stores.map((store) => store.toPrimitives()),
      meta: criteria.buildMeta(count),
    };
  }

  private buildCriteria(filters: StoreFilters): Criteria {
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
