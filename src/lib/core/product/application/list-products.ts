import { Meta } from "@/lib/types/collection";
import { Criteria, Filter, Operator, Order, Pagination } from "@/lib/types/criteria";
import { Primitives } from "@/lib/types/primitives";
import { Product } from "../domain/product";
import { ProductRepository } from "../domain/product.repository";

type ProductFilters = {
  organizationId: string;
  query?: string;
  brandId?: string;
  priceRange?: { min: number; max: number };
  costRange?: { min: number; max: number };
};

export class ListProducts {
  constructor(private readonly repository: ProductRepository) {}

  async execute(
    filters: ProductFilters,
    order: Order,
    pagination: Pagination
  ): Promise<{ items: Primitives<Product>[]; meta: Meta }> {
    const criteria = this.buildCriteria(filters)
      .orderBy(order.field, order.order)
      .paginate(pagination.limit, pagination.offset);

    const [products, count] = await Promise.all([
      this.repository.search(criteria),
      this.repository.count(criteria),
    ]);

    return {
      items: products.map((product) => product.toPrimitives()),
      meta: criteria.buildMeta(count),
    };
  }

  private buildCriteria(filters: ProductFilters): Criteria {
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

    if (filters.brandId) {
      newFilters = [
        ...newFilters,
        { field: "brandId", value: filters.brandId, operator: Operator.EQUAL },
      ];
    }

    if (filters.priceRange) {
      newFilters = [
        ...newFilters,
        { field: "price", value: filters.priceRange.min, operator: Operator.GTE },
        { field: "price", value: filters.priceRange.max, operator: Operator.LTE },
      ];
    }

    if (filters.costRange) {
      newFilters = [
        ...newFilters,
        { field: "cost", value: filters.costRange.min, operator: Operator.GTE },
        { field: "cost", value: filters.costRange.max, operator: Operator.LTE },
      ];
    }

    return Criteria.withFilters(newFilters);
  }
}
