import { UpdateBrand, UpdateBrandError } from "@/contexts/catalogue/brand/application/update-brand";
import { BrandNotFoundError } from "@/contexts/catalogue/brand/domain/brand-not-found";
import { CannotUpdateBrandError } from "@/contexts/catalogue/brand/domain/cannot-update-brand";
import { DrizzleBrandRepository } from "@/contexts/catalogue/brand/infrastructure/drizzle-brand-repository";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
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
    const service = new UpdateBrand(new DrizzleBrandRepository());
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
