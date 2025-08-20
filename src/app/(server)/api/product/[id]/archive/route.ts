import {
  ArchiveProduct,
  ArchiveProductError,
} from "@/lib/core/product/application/archive-product";
import { CannotUpdateProductError, ProductNotFoundError } from "@/lib/core/product/domain/errors";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
import { revalidateTag } from "next/cache";
import z from "zod";

export const PUT = routeHandler(
  {
    name: "archive-product",
    paramsSchema: z.object({ id: z.string().uuid("Invalid product ID") }),
  },
  async ({ params, organization }) => {
    const service = new ArchiveProduct(new DrizzleProductRepository());
    await service.execute(params.id, organization.id);
    revalidateTag(`products:${organization.id}`);
    revalidateTag(`product:${params.id}`);
    return HttpNextResponse.noResponse(200);
  },
  (error: ArchiveProductError) => {
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
