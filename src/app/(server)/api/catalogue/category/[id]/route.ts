import {
  UpdateCategory,
  UpdateCategoryError,
} from "@/contexts/catalogue/category/application/update-category";
import { CannotUpdateCategoryError } from "@/contexts/catalogue/category/domain/cannot-update-category";
import { CategoryNotFoundError } from "@/contexts/catalogue/category/domain/not-found-category";
import { DrizzleCategoryRepository } from "@/contexts/catalogue/category/infrastructure/drizzle-category-repository";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import z from "zod";

const saveCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

const paramsSchema = z.object({
  id: z.string().uuid("Invalid category ID format"),
});

export const PUT = routeHandler(
  { name: "update-product-category", schema: saveCategorySchema, paramsSchema },
  async ({ body, params, organization }) => {
    const service = new UpdateCategory(new DrizzleCategoryRepository());
    await service.execute(params.id, body.name, organization.id);
    return HttpNextResponse.noResponse(200);
  },
  (error: UpdateCategoryError) => {
    switch (true) {
      case error instanceof CategoryNotFoundError:
        return HttpNextResponse.domainError(error, 404);
      case error instanceof CannotUpdateCategoryError:
        return HttpNextResponse.domainError(error, 403);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);
