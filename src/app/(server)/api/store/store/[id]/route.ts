import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import { UpdateStore, UpdateStoreError } from "@/contexts/store/store/application/update-store";
import { CannotUpdateStore } from "@/contexts/store/store/domain/cannot-update-store";
import { StoreNotFound } from "@/contexts/store/store/domain/store-not-found";
import { DrizzleStoreRepository } from "@/contexts/store/store/infrastructure/drizzle-store-repository";
import { revalidateTag } from "next/cache";
import z from "zod";

export const PUT = routeHandler(
  {
    name: "update-store",
    schema: z.object({
      name: z.string().optional(),
      address: z.string().optional(),
    }),
    paramsSchema: z.object({
      id: z.string().uuid(),
    }),
  },
  async ({ organization, body, params }) => {
    const service = new UpdateStore(new DrizzleStoreRepository());

    await service.execute(params.id, organization.id, body);

    revalidateTag(`stores:${organization.id}`);

    return HttpNextResponse.noResponse(200);
  },
  (error: UpdateStoreError) => {
    switch (true) {
      case error instanceof StoreNotFound:
        return HttpNextResponse.domainError(error, 404);
      case error instanceof CannotUpdateStore:
        return HttpNextResponse.domainError(error, 403);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);
