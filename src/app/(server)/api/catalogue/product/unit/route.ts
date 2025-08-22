import { ListUnits } from "@/contexts/catalogue/item/application/list-units";
import { DrizzleItemRepository } from "@/contexts/catalogue/item/infrastructure/drizzle-item-repository";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";

export const GET = routeHandler(
  {
    name: "get-product-units",
  },
  async ({}) => {
    const service = new ListUnits(new DrizzleItemRepository());
    const units = await service.execute();
    return HttpNextResponse.json(units);
  },
);
