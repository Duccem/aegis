import { Uuid } from "@/lib/types/value-objects/uuid";
import { Organization } from "./organization";

export interface OrganizationRepository {
  find(id: Uuid): Promise<Organization | null>;
  saveMetrics(organizationId: Uuid, metrics: Organization): Promise<void>;
  updatePlan(organizationId: Uuid, plan: string): Promise<void>;
}
