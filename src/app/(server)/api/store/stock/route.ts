import { Direction } from "@/contexts/shared/domain/criteria";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { paginateSchema } from "@/contexts/shared/infrastructure/http/paginate-schema";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import { ListStock } from "@/contexts/store/stock/application/list-stock";
import { DrizzleStockRepository } from "@/contexts/store/stock/infrastructure/drizzle-stock-repository";
import z from "zod";

const schema = z
  .object({
    itemId: z.string().optional(),
    storeId: z.string().optional(),
  })
  .merge(paginateSchema);

export const GET = routeHandler(
  { name: "get-stock", querySchema: schema },
  async ({ organization, searchParams }) => {
    const service = new ListStock(new DrizzleStockRepository());

    const filters = {
      itemId: searchParams.itemId,
      storeId: searchParams.storeId,
    };

    const order = {
      field: searchParams.sort || "createdAt",
      order: (searchParams.order as Direction) || "ASC",
    };

    const pagination = {
      limit: searchParams.limit ? searchParams.limit : 10,
      offset: searchParams.page ? searchParams.page - 1 : 0,
    };

    const stocks = await service.execute(organization.id, filters, order, pagination);
    return HttpNextResponse.json(stocks);
  },
);
