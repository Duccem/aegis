import { Criteria } from "@/contexts/shared/domain/criteria";
import { Brand } from "./brand";

export interface BrandRepository {
  save(brand: Brand): Promise<void>;
  find(criteria: Criteria): Promise<Brand | null>;
  search(criteria: Criteria): Promise<Brand[]>;
  delete(id: string): Promise<void>;
  count(criteria: Criteria): Promise<number>;
}
