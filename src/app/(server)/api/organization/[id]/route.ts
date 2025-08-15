import { SaveMetrics } from "@/lib/core/organization/application/save-metrics";
import { UpdateOrganizationPlan } from "@/lib/core/organization/application/update-organization-plan";
import { OrganizationNotFound } from "@/lib/core/organization/domain/organization-not-found";
import { DrizzleOrganizationRepository } from "@/lib/core/organization/infrastructure/drizzle-organization-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
import z from "zod";
const saveMetricsSchema = z.object({
  organizationMembers: z.number().optional(),
  aiCompletions: z.number().optional(),
  productsCreated: z.number().optional(),
  invoiceSent: z.number().optional(),
});

const paramsSchema = z.object({
  id: z.string().uuid(),
});

export const POST = routeHandler(
  { name: "save-metrics", schema: saveMetricsSchema, paramsSchema },
  async ({ body, params }) => {
    const service = new SaveMetrics(new DrizzleOrganizationRepository());
    await service.execute(params.id, body);
    return HttpNextResponse.noResponse(204);
  },
  (error: OrganizationNotFound) => {
    switch (true) {
      case error instanceof OrganizationNotFound:
        return HttpNextResponse.domainError(error, 404);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);

export const PUT = routeHandler(
  {
    name: "update-plan",
    paramsSchema: paramsSchema.extend({ id: z.string() }),
    querySchema: z.object({ plan: z.string() }),
  },
  async ({ params, searchParams }) => {
    const { id } = params;
    const { plan } = searchParams;
    const service = new UpdateOrganizationPlan(new DrizzleOrganizationRepository());
    await service.execute(id, plan);
    return HttpNextResponse.noResponse(204);
  },
  (error: OrganizationNotFound) => {
    switch (true) {
      case error instanceof OrganizationNotFound:
        return HttpNextResponse.domainError(error, 404);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);
