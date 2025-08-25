import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import { ListStock } from "@/contexts/store/stock/application/list-stock";
import { DrizzleStockRepository } from "@/contexts/store/stock/infrastructure/drizzle-stock-repository";
import z from "zod";

const schema = z.object({
  itemId: z.string().optional(),
  storeId: z.string().optional(),
});

export const GET = routeHandler(
  { name: "get-stock", querySchema: schema },
  async ({ organization, searchParams }) => {
    const service = new ListStock(new DrizzleStockRepository());
    const stocks = await service.execute(organization.id, {
      itemId: searchParams.itemId,
      storeId: searchParams.storeId,
    });
    return HttpNextResponse.json(stocks);
  },
);
