import { AddImage, AddImageError } from "@/lib/core/product/application/add-image";
import { RemoveImage, RemoveImageError } from "@/lib/core/product/application/remove-image";
import { CannotUpdateProductError, ProductNotFoundError } from "@/lib/core/product/domain/errors";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
import { revalidateTag } from "next/cache";
import z from "zod";

export const PUT = routeHandler(
  {
    name: "add-image",
    paramsSchema: z.object({ id: z.string() }),
    schema: z.object({ url: z.url() }),
  },
  async ({ params: { id }, organization, body: { url } }) => {
    const service = new AddImage(new DrizzleProductRepository());
    await service.execute(id, organization.id, url);
    revalidateTag(`product:${id}`);
    revalidateTag(`organization:${organization.id}`);
    return HttpNextResponse.noResponse();
  },
  (error: AddImageError) => {
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

export const DELETE = routeHandler(
  {
    name: "remove-image",
    paramsSchema: z.object({ id: z.string() }),
    schema: z.object({ url: z.url() }),
  },
  async ({ params: { id }, organization, body: { url } }) => {
    const service = new RemoveImage(new DrizzleProductRepository());
    await service.execute(id, organization.id, url);
    return HttpNextResponse.noResponse();
  },
  (error: RemoveImageError) => {
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
