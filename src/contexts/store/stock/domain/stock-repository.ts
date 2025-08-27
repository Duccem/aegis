import { Criteria } from "@/contexts/shared/domain/criteria";
import { Stock, StockId, StockItem, StockStore } from "./stock";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";

export interface StockRepository {
  save(stock: Stock): Promise<void>;
  find(criteria: Criteria): Promise<Stock | null>;
  search(criteria: Criteria): Promise<Stock[]>;
  delete(id: StockId): Promise<void>;
  items(organizationId: Uuid): Promise<StockItem[]>;
  stores(organizationId: Uuid): Promise<StockStore[]>;
}
