import { GetOrganization } from "@/contexts/auth/organization/application/get-organization";
import { OrganizationNotFound } from "@/contexts/auth/organization/domain/organization-not-found";
import { DrizzleOrganizationRepository } from "@/contexts/auth/organization/infrastructure/drizzle-organization-repository";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";

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
