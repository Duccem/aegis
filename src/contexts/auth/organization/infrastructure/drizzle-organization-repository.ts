import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { database } from "@/contexts/shared/infrastructure/database";
import {
  organization,
  organization_metrics,
} from "@/contexts/shared/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { Organization } from "../domain/organization";
import { OrganizationRepository } from "../domain/organization-repository";

export class DrizzleOrganizationRepository implements OrganizationRepository {
  async find(id: Uuid): Promise<Organization | null> {
    const result = await database.query.organization.findFirst({
      where: eq(organization.id, id.value),
      with: {
        metrics: true,
      },
    });
    if (!result) return null;
    return Organization.fromPrimitives({
      id: result.id,
      name: result.name,
      slug: result.slug,
      logo: result.logo,
      metadata: result.metadata,
      plan: result.plan,
      metrics: result.metrics,
      createdAt: result.createdAt,
      updatedAt: result.createdAt,
    });
  }

  async saveMetrics(organizationId: Uuid, organization: Organization): Promise<void> {
    const data = organization.metrics.toPrimitives();
    await database
      .insert(organization_metrics)
      .values({
        organizationId: organizationId.value,
        organizationMembers: data.organizationMembers,
        aiCompletions: data.aiCompletions,
        productsCreated: data.productsCreated,
        invoiceSent: data.invoiceSent,
      })
      .onConflictDoUpdate({
        target: [organization_metrics.organizationId],
        set: {
          organizationMembers: data.organizationMembers,
          aiCompletions: data.aiCompletions,
          productsCreated: data.productsCreated,
          invoiceSent: data.invoiceSent,
        },
      });
  }

  async updatePlan(organizationId: Uuid, plan: string): Promise<void> {
    await database
      .update(organization)
      .set({ plan })
      .where(eq(organization.id, organizationId.value));
  }
}
