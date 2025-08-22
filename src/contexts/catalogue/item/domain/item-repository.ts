import { Criteria } from "@/contexts/shared/domain/criteria";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { Item } from "./item";
import { Unit } from "./unit";

export interface ItemRepository {
  save(product: Item): Promise<void>;
  find(criteria: Criteria): Promise<Item | null>;
  search(criteria: Criteria): Promise<Item[]>;
  count(criteria: Criteria): Promise<number>;
  delete(productId: Uuid): Promise<void>;

  metrics(organizationId: Uuid): Promise<{
    totalProducts: number;
    totalProductsThisMonth: number;
    totalActiveProducts: number;
  }>;

  units(): Promise<Unit[]>;
}
