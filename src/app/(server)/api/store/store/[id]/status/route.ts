import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import {
  ToggleStoreStatus,
  ToggleStoreStatusError,
} from "@/contexts/store/store/application/toggle-store-status";
import { CannotUpdateStore } from "@/contexts/store/store/domain/cannot-update-store";
import { StoreNotFound } from "@/contexts/store/store/domain/store-not-found";
import { DrizzleStoreRepository } from "@/contexts/store/store/infrastructure/drizzle-store-repository";
import { revalidateTag } from "next/cache";
import z from "zod";

export const PUT = routeHandler(
  { name: "toggle-store-status", paramsSchema: z.object({ id: z.uuid() }) },
  async ({ params, organization }) => {
    const service = new ToggleStoreStatus(new DrizzleStoreRepository());
    await service.execute(params.id, organization.id);
    revalidateTag(`stores:${organization.id}`);
    return HttpNextResponse.noResponse(200);
  },
  (error: ToggleStoreStatusError) => {
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
