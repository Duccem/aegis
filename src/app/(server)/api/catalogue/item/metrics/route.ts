import { GetItemsMetrics } from "@/contexts/catalogue/item/application/get-items-metrics";
import { DrizzleItemRepository } from "@/contexts/catalogue/item/infrastructure/drizzle-item-repository";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import { unstable_cache as cache } from "next/cache";

export const GET = routeHandler({ name: "product-metrics" }, async ({ organization }) => {
  const service = new GetItemsMetrics(new DrizzleItemRepository());
  const metrics = await cache(
    async () => {
      return service.execute(organization.id);
    },
    ["item-metrics", organization.id],
    {
      tags: [`organization:${organization.id}:metrics`],
      revalidate: 60, // Cache for 60 seconds
    },
  )();
  return HttpNextResponse.json(metrics);
});
