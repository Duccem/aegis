import { Criteria, Operator } from "@/contexts/shared/domain/criteria";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { Stock } from "../domain/stock";
import { StockRepository } from "../domain/stock-repository";

export type ListStockFilters = {
  itemId?: string;
  storeId?: string;
};

export class ListStock {
  constructor(private readonly repository: StockRepository) {}

  async execute(organizationId: string, filters: ListStockFilters): Promise<Primitives<Stock>[]> {
    const criteria = this.buildCriteria(organizationId, filters);
    const stocks = await this.repository.search(criteria);
    return stocks.map((stock) => stock.toPrimitives());
  }

  private buildCriteria(organizationId: string, filters: ListStockFilters): Criteria {
    const formattedFilters = [
      { field: "organizationId", operator: Operator.EQUAL, value: organizationId },
    ];

    if (filters.itemId) {
      formattedFilters.push({ field: "itemId", operator: Operator.EQUAL, value: filters.itemId });
    }

    if (filters.storeId) {
      formattedFilters.push({ field: "storeId", operator: Operator.EQUAL, value: filters.storeId });
    }

    return Criteria.withFilters(formattedFilters);
  }
}
