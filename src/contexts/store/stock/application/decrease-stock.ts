import { Criteria, Operator } from "@/contexts/shared/domain/criteria";
import { Stock } from "../domain/stock";
import { StockRepository } from "../domain/stock-repository";

export class DecreaseStock {
  constructor(private readonly repository: StockRepository) {}

  async execute(
    itemId: string,
    storeId: string,
    organizationId: string,
    quantity: number,
  ): Promise<void> {
    let stock = await this.getStock(itemId, storeId);
    if (!stock) {
      stock = Stock.create(itemId, storeId, organizationId);
    }
    stock.decrease(quantity);
    await this.repository.save(stock);
  }

  private async getStock(itemId: string, storeId: string): Promise<Stock | null> {
    const criteria = Criteria.withFilters([
      { field: "itemId", value: itemId, operator: Operator.EQUAL },
      { field: "storeId", value: storeId, operator: Operator.EQUAL },
    ]);

    const stock = await this.repository.find(criteria);

    return stock;
  }
}
