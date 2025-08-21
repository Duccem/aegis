import { Criteria } from "@/contexts/shared/domain/criteria";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { Category } from "./category";

export interface CategoryRepository {
  save(category: Category): Promise<void>;
  find(criteria: Criteria): Promise<Category | null>;
  search(criteria: Criteria): Promise<Category[]>;
  delete(id: Uuid): Promise<void>;
  count(criteria: Criteria): Promise<number>;
}
