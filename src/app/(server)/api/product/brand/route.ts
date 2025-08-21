import { ListBrands } from "@/lib/core/product/application/list-brands";
import { CreateBrand } from "@/lib/core/product/application/save-brand";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
import z from "zod";

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

const saveBrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const POST = routeHandler(
  { name: "create-product-brand", schema: saveBrandSchema },
  async ({ body, organization }) => {
    const service = new CreateBrand(new DrizzleProductRepository());
    await service.execute(body.name, organization.id);
    return HttpNextResponse.noResponse(201);
  },
);
