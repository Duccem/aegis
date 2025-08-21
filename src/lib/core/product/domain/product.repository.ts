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

  metrics(organizationId: Uuid): Promise<{
    totalProducts: number;
    totalProductsThisMonth: number;
    totalActiveProducts: number;
  }>;

  saveCategory(category: Category): Promise<void>;
  categories(criteria: Criteria): Promise<Category[]>;
  category(criteria: Criteria): Promise<Category | null>;

  saveBrand(brand: Brand): Promise<void>;
  brands(criteria: Criteria): Promise<Brand[]>;
  brand(criteria: Criteria): Promise<Brand | null>;

  units(): Promise<Unit[]>;
}
