import { ListBrands } from "@/lib/core/product/application/list-brands";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";

export const GET = routeHandler(
  {
    name: "get-product-brands",
  },
  async ({ organization }) => {
    const service = new ListBrands(new DrizzleProductRepository());
    const brands = await service.execute(organization.id);
    return HttpNextResponse.json(brands);
  },
);
