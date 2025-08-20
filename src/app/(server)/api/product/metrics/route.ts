import { GetProductMetrics } from "@/lib/core/product/application/get-product-metrics";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
import { unstable_cache as cache } from "next/cache";

export const GET = routeHandler({ name: "product-metrics" }, async ({ organization }) => {
  const service = new GetProductMetrics(new DrizzleProductRepository());
  const metrics = await cache(
    async () => {
      return service.execute(organization.id);
    },
    ["product-metrics", organization.id],
    {
      tags: [`organization:${organization.id}:metrics`],
      revalidate: 60, // Cache for 60 seconds
    },
  )();
  return HttpNextResponse.json(metrics);
});
