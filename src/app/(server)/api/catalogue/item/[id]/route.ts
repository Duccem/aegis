import { UpdateItem, UpdateItemErrors } from "@/contexts/catalogue/item/application/update-item";
import { CannotUpdateItemError } from "@/contexts/catalogue/item/domain/errors/cannot-update-item";
import { ItemNotFound } from "@/contexts/catalogue/item/domain/errors/item-not-found";
import { DrizzleItemRepository } from "@/contexts/catalogue/item/infrastructure/drizzle-item-repository";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import { revalidateTag } from "next/cache";
import z from "zod";

const routeParamsSchema = z.object({
  id: z.string().uuid("Invalid product ID"),
});
const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().min(1, "Description is required"),
  brandId: z.string().uuid("Invalid brand ID"),
  unitId: z.string().uuid("Invalid unit ID"),
  categories: z
    .array(z.string().uuid("Invalid category ID"))
    .min(1, "At least one category is required"),
});
export const PUT = routeHandler(
  { name: "update-product", paramsSchema: routeParamsSchema, schema: updateProductSchema },
  async ({ body, params, organization }) => {
    const service = new UpdateItem(new DrizzleItemRepository());
    await service.execute(params.id, organization.id, body);
    revalidateTag(`products:${organization.id}`);
    return HttpNextResponse.noResponse(200);
  },
  (error: UpdateItemErrors) => {
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
