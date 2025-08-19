import { UpdateProduct, UpdateProductErrors } from "@/lib/core/product/application/update-product";
import { CannotUpdateProductError, ProductNotFoundError } from "@/lib/core/product/domain/errors";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
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
    const service = new UpdateProduct(new DrizzleProductRepository());
    await service.execute(params.id, organization.id, body);
    revalidateTag(`products:${organization.id}`);
    return HttpNextResponse.noResponse(200);
  },
  (error: UpdateProductErrors) => {
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
