import { Criteria } from "@/lib/types/criteria";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { Store } from "./store";

export interface StoreRepository {
  save(store: Store): Promise<void>;
  find(criteria: Criteria): Promise<Store | null>;
  search(criteria: Criteria): Promise<Store[]>;
  delete(id: Uuid): Promise<void>;
  count(criteria: Criteria): Promise<number>;
}
