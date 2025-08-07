import { Criteria } from "@/lib/types/criteria";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { Product } from "./product";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  find(criteria: Criteria): Promise<Product | null>;
  search(criteria: Criteria): Promise<Product[]>;
  count(criteria: Criteria): Promise<number>;
  delete(productId: Uuid): Promise<void>;
}
