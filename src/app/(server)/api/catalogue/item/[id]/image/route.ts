import { AddImage, AddImageError } from "@/contexts/catalogue/item/application/add-image";
import { RemoveImage, RemoveImageError } from "@/contexts/catalogue/item/application/remove-image";
import { CannotUpdateItemError } from "@/contexts/catalogue/item/domain/errors/cannot-update-item";
import { ItemNotFound } from "@/contexts/catalogue/item/domain/errors/item-not-found";
import { DrizzleItemRepository } from "@/contexts/catalogue/item/infrastructure/drizzle-item-repository";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import { revalidateTag } from "next/cache";
import z from "zod";

export const PUT = routeHandler(
  {
    name: "add-image",
    paramsSchema: z.object({ id: z.string() }),
    schema: z.object({ url: z.url() }),
  },
  async ({ params: { id }, organization, body: { url } }) => {
    const service = new AddImage(new DrizzleItemRepository());
    await service.execute(id, organization.id, url);
    revalidateTag(`product:${id}`);
    revalidateTag(`organization:${organization.id}`);
    return HttpNextResponse.noResponse();
  },
  (error: AddImageError) => {
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

export const DELETE = routeHandler(
  {
    name: "remove-image",
    paramsSchema: z.object({ id: z.string() }),
    schema: z.object({ url: z.url() }),
  },
  async ({ params: { id }, organization, body: { url } }) => {
    const service = new RemoveImage(new DrizzleItemRepository());
    await service.execute(id, organization.id, url);
    return HttpNextResponse.noResponse();
  },
  (error: RemoveImageError) => {
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
