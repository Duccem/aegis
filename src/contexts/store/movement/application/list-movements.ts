import { Collection } from "@/contexts/shared/domain/collection";
import { Criteria, Operator, Order, Pagination } from "@/contexts/shared/domain/criteria";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { Movement } from "../domain/movement";
import { MovementRepository } from "../domain/movement-repository";

export type ListMovementsFilters = {
  itemId?: string;
  originStoreId?: string;
  targetStoreId?: string;
  type?: "addition" | "removal" | "transfer";
};

export class ListMovements {
  constructor(private readonly repository: MovementRepository) {}

  async execute(
    organizationId: string,
    filters: ListMovementsFilters,
    order: Order,
    pagination: Pagination,
  ): Promise<Collection<Primitives<Movement>>> {
    const criteria = this.buildCriteria(organizationId, filters)
      .orderBy(order.field, order.order)
      .paginate(pagination.limit, pagination.offset);

    const [movements, total] = await Promise.all([
      this.repository.search(criteria),
      this.repository.count(criteria),
    ]);

    return {
      items: movements.map((movement) => movement.toPrimitives()),
      meta: criteria.buildMeta(total),
    };
  }

  private buildCriteria(organizationId: string, filters: ListMovementsFilters): Criteria {
    const criteria = [{ field: "organizationId", operator: Operator.EQUAL, value: organizationId }];

    if (filters.itemId) {
      criteria.push({ field: "itemId", operator: Operator.EQUAL, value: filters.itemId });
    }

    if (filters.originStoreId) {
      criteria.push({
        field: "originStoreId",
        operator: Operator.EQUAL,
        value: filters.originStoreId,
      });
    }

    if (filters.targetStoreId) {
      criteria.push({
        field: "targetStoreId",
        operator: Operator.EQUAL,
        value: filters.targetStoreId,
      });
    }

    if (filters.type) {
      criteria.push({ field: "type", operator: Operator.EQUAL, value: filters.type });
    }

    return Criteria.withFilters(criteria);
  }
}
