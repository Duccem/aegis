import {
  ToggleItemStatus,
  ToggleItemStatusError,
} from "@/contexts/catalogue/item/application/toggle-item-status";
import { CannotUpdateItemError } from "@/contexts/catalogue/item/domain/errors/cannot-update-item";
import { ItemNotFound } from "@/contexts/catalogue/item/domain/errors/item-not-found";
import { DrizzleItemRepository } from "@/contexts/catalogue/item/infrastructure/drizzle-item-repository";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import { revalidateTag } from "next/cache";
import z from "zod";

export const PUT = routeHandler(
  {
    name: "toggle-product-status",
    paramsSchema: z.object({ id: z.string().uuid("Invalid product ID") }),
  },
  async ({ params, organization }) => {
    const service = new ToggleItemStatus(new DrizzleItemRepository());
    await service.execute(params.id, organization.id);
    revalidateTag(`products:${organization.id}`);
    revalidateTag(`product:${params.id}`);
    revalidateTag(`organization:${organization.id}:metrics`);
    return HttpNextResponse.noResponse(200);
  },
  (error: ToggleItemStatusError) => {
    switch (true) {
      case error instanceof ItemNotFound:
        return HttpNextResponse.domainError(error, 404);
      case error instanceof CannotUpdateItemError:
        return HttpNextResponse.domainError(error, 503);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);
