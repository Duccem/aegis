import { Criteria } from "@/contexts/shared/domain/criteria";
import { Movement } from "./movement";

export interface MovementRepository {
  save(data: Movement): Promise<void>;
  search(criteria: Criteria): Promise<Movement[]>;
  count(criteria: Criteria): Promise<number>;
}
