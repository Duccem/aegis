import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { OrganizationNotFound } from "../domain/organization-not-found";
import { OrganizationRepository } from "../domain/organization-repository";

export class SaveMetrics {
  constructor(private repository: OrganizationRepository) {}

  async execute(
    organizationId: string,
    metrics: {
      organizationMembers?: number;
      aiCompletions?: number;
      productsCreated?: number;
      invoiceSent?: number;
    },
  ): Promise<void> {
    const organization = await this.repository.find(Uuid.fromString(organizationId));
    if (!organization) {
      throw new OrganizationNotFound(organizationId);
    }
    organization.updateMetrics({
      organizationMembers:
        metrics.organizationMembers ?? organization.metrics?.organizationMembers.value ?? 0,
      aiCompletions: metrics.aiCompletions ?? organization.metrics?.aiCompletions.value ?? 0,
      productsCreated: metrics.productsCreated ?? organization.metrics?.productsCreated.value ?? 0,
      invoiceSent: metrics.invoiceSent ?? organization.metrics?.invoiceSent.value ?? 0,
    });

    await this.repository.saveMetrics(Uuid.fromString(organizationId), organization);
  }
}
