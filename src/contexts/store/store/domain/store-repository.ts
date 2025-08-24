import { Criteria } from "@/contexts/shared/domain/criteria";
import { Store, StoreId } from "./store";

export interface StoreRepository {
  save(store: Store): Promise<void>;
  find(criteria: Criteria): Promise<Store | null>;
  search(criteria: Criteria): Promise<Store[]>;
  delete(store: StoreId): Promise<void>;
  count(criteria: Criteria): Promise<number>;
}
