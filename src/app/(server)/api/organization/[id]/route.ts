import { SaveMetrics } from "@/lib/core/organization/application/save-metrics";
import { OrganizationNotFound } from "@/lib/core/organization/domain/organization-not-found";
import { DrizzleOrganizationRepository } from "@/lib/core/organization/infrastructure/drizzle-organization-repository";
import { HttpNextResponse, routeHandler } from "@/lib/http/route-handler";
import { NextResponse } from "next/server";
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
    return NextResponse.json({
      message: "Metrics saved successfully",
    });
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
