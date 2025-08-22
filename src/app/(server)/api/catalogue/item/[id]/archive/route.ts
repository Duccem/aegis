import {
  ArchiveItemError,
  ArchiveProduct,
} from "@/contexts/catalogue/item/application/archive-item";
import { CannotUpdateItemError } from "@/contexts/catalogue/item/domain/errors/cannot-update-item";
import { ItemNotFound } from "@/contexts/catalogue/item/domain/errors/item-not-found";
import { DrizzleItemRepository } from "@/contexts/catalogue/item/infrastructure/drizzle-item-repository";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import { revalidateTag } from "next/cache";
import z from "zod";

export const PUT = routeHandler(
  {
    name: "archive-product",
    paramsSchema: z.object({ id: z.string().uuid("Invalid product ID") }),
  },
  async ({ params, organization }) => {
    const service = new ArchiveProduct(new DrizzleItemRepository());
    await service.execute(params.id, organization.id);
    revalidateTag(`items:${organization.id}`);
    revalidateTag(`item:${params.id}`);
    return HttpNextResponse.noResponse(200);
  },
  (error: ArchiveItemError) => {
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
