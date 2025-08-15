import { Uuid } from "@/lib/types/value-objects/uuid";
import { OrganizationNotFound } from "../domain/organization-not-found";
import { OrganizationRepository } from "../domain/organization-repository";

export class UpdateOrganizationPlan {
  constructor(private readonly repository: OrganizationRepository) {}

  async execute(organizationId: string, plan: string) {
    const organization = await this.repository.find(Uuid.fromString(organizationId));
    if (!organization) {
      throw new OrganizationNotFound(organizationId);
    }

    await this.repository.updatePlan(Uuid.fromString(organizationId), plan);
  }
}
