import { ListCategories } from "@/lib/core/product/application/list-categories";
import { SaveCategory } from "@/lib/core/product/application/save-category";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
import z from "zod";

export const GET = routeHandler(
  {
    name: "get-product-categories",
  },
  async ({ organization }) => {
    const service = new ListCategories(new DrizzleProductRepository());
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
    const service = new SaveCategory(new DrizzleProductRepository());
    await service.execute(body.name, organization.id);
    return HttpNextResponse.noResponse(201);
  },
);
