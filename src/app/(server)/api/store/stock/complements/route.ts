import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import { GetStockComplements } from "@/contexts/store/stock/application/get-stock-complements";
import { DrizzleStockRepository } from "@/contexts/store/stock/infrastructure/drizzle-stock-repository";
import { unstable_cache as cache } from "next/cache";

export const GET = routeHandler({ name: "route-handler" }, async ({ organization }) => {
  const service = new GetStockComplements(new DrizzleStockRepository());
  const complements = await cache(
    () => service.run(organization.id),
    ["stock-complements", organization.id],
    { revalidate: 60, tags: [`stock-complements:${organization.id}`] },
  )();
  return HttpNextResponse.json(complements);
});
