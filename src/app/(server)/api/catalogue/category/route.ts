import { ListCategories } from "@/contexts/catalogue/category/application/list-categories";
import { SaveCategory } from "@/contexts/catalogue/category/application/save-category";
import { DrizzleCategoryRepository } from "@/contexts/catalogue/category/infrastructure/drizzle-category-repository";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import z from "zod";

export const GET = routeHandler(
  {
    name: "get-product-categories",
  },
  async ({ organization }) => {
    const service = new ListCategories(new DrizzleCategoryRepository());
    const categories = await service.execute(organization.id);
    return HttpNextResponse.json(categories);
  },
);

export const POST = routeHandler(
  {
    name: "create-product-category",
    schema: z.object({
      name: z.string().min(1, "Name is required"),
    }),
  },
  async ({ body, organization }) => {
    const service = new SaveCategory(new DrizzleCategoryRepository());
    await service.execute(body.name, organization.id);
    return HttpNextResponse.noResponse(201);
  },
);
