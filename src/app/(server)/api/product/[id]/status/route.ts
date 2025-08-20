import {
  ToggleProductStatus,
  ToggleProductStatusError,
} from "@/lib/core/product/application/toggle-product-status";
import { CannotUpdateProductError, ProductNotFoundError } from "@/lib/core/product/domain/errors";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
import { revalidateTag } from "next/cache";
import z from "zod";

export const PUT = routeHandler(
  {
    name: "toggle-product-status",
    paramsSchema: z.object({ id: z.string().uuid("Invalid product ID") }),
  },
  async ({ params, organization }) => {
    const service = new ToggleProductStatus(new DrizzleProductRepository());
    await service.execute(params.id, organization.id);
    revalidateTag(`products:${organization.id}`);
    revalidateTag(`product:${params.id}`);
    revalidateTag(`organization:${organization.id}:metrics`);
    return HttpNextResponse.noResponse(200);
  },
  (error: ToggleProductStatusError) => {
    switch (true) {
      case error instanceof ProductNotFoundError:
        return HttpNextResponse.domainError(error, 404);
      case error instanceof CannotUpdateProductError:
        return HttpNextResponse.domainError(error, 503);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);
