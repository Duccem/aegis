import { GetOrganization } from "@/lib/core/organization/application/get-organization";
import { OrganizationNotFound } from "@/lib/core/organization/domain/organization-not-found";
import { DrizzleOrganizationRepository } from "@/lib/core/organization/infrastructure/drizzle-organization-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";

export const GET = routeHandler(
  { name: "get-org" },
  async ({ organization }) => {
    const service = new GetOrganization(new DrizzleOrganizationRepository());
    const org = await service.execute(organization.id);
    return HttpNextResponse.json(org);
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
