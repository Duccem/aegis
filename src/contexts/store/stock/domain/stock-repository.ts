import { Criteria } from "@/contexts/shared/domain/criteria";
import { Stock, StockId } from "./stock";

export interface StockRepository {
  save(stock: Stock): Promise<void>;
  find(criteria: Criteria): Promise<Stock | null>;
  search(criteria: Criteria): Promise<Stock[]>;
  delete(id: StockId): Promise<void>;
}
