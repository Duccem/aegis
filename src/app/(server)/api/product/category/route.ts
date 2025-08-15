import { ListCategories } from "@/lib/core/product/application/list-categories";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";

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
