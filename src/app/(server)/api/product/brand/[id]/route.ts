import { UpdateBrand, UpdateBrandError } from "@/lib/core/product/application/update-brand";
import { BrandNotFoundError, CannotUpdateBrandError } from "@/lib/core/product/domain/errors";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
import z from "zod";

const saveBrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

const paramsSchema = z.object({
  id: z.string().uuid("Invalid brand ID format"),
});

export const PUT = routeHandler(
  { name: "update-product-brand", schema: saveBrandSchema, paramsSchema },
  async ({ body, params, organization }) => {
    const service = new UpdateBrand(new DrizzleProductRepository());
    await service.execute(params.id, body.name, organization.id);
    return HttpNextResponse.noResponse(200);
  },
  (error: UpdateBrandError) => {
    switch (true) {
      case error instanceof BrandNotFoundError:
        return HttpNextResponse.domainError(error, 404);
      case error instanceof CannotUpdateBrandError:
        return HttpNextResponse.domainError(error, 403);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);
