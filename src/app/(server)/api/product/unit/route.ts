import { ListUnits } from "@/lib/core/product/application/list-units";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";

export const GET = routeHandler(
  {
    name: "get-product-units",
  },
  async ({}) => {
    const service = new ListUnits(new DrizzleProductRepository());
    const units = await service.execute();
    return HttpNextResponse.json(units);
  },
);
