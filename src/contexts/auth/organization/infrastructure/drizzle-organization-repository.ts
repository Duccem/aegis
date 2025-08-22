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
    const data = organization.metrics?.toPrimitives() ?? {
      organizationMembers: 0,
      aiCompletions: 0,
      productsCreated: 0,
      invoiceSent: 0,
    };
    const exist = await database
      .select()
      .from(organization_metrics)
      .where(eq(organization_metrics.organizationId, organizationId.value))
      .limit(1);
    if (exist.length > 0) {
      await database
        .update(organization_metrics)
        .set(data)
        .where(eq(organization_metrics.organizationId, organizationId.value));
    } else {
      await database.insert(organization_metrics).values({
        organizationId: organizationId.value,
        ...data,
      });
    }
  }

  async updatePlan(organizationId: Uuid, plan: string): Promise<void> {
    await database
      .update(organization)
      .set({ plan })
      .where(eq(organization.id, organizationId.value));
  }
}
