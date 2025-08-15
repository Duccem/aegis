import { Criteria } from "@/lib/types/criteria";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { Brand } from "./brand";
import { Category } from "./category";
import { Product } from "./product";
import { Unit } from "./unit";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  find(criteria: Criteria): Promise<Product | null>;
  search(criteria: Criteria): Promise<Product[]>;
  count(criteria: Criteria): Promise<number>;
  delete(productId: Uuid): Promise<void>;
  categories(organizationId: Uuid): Promise<Category[]>;
  units(): Promise<Unit[]>;
  brands(organizationId: Uuid): Promise<Brand[]>;
}
