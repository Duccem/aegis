import { GetOrganization } from "@/lib/core/organization/application/get-organization";
import { OrganizationNotFound } from "@/lib/core/organization/domain/organization-not-found";
import { DrizzleOrganizationRepository } from "@/lib/core/organization/infrastructure/drizzle-organization-repository";
import { HttpNextResponse, routeHandler } from "@/lib/http/route-handler";
import { NextResponse } from "next/server";

export const GET = routeHandler(
  { name: "get-org" },
  async ({ organization }) => {
    const service = new GetOrganization(new DrizzleOrganizationRepository());
    const org = await service.execute(organization.id);
    return NextResponse.json({ data: org });
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
