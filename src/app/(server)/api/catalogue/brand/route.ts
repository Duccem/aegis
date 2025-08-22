import { ListBrands } from "@/contexts/catalogue/brand/application/list-brands";
import { CreateBrand } from "@/contexts/catalogue/brand/application/save-brand";
import { DrizzleBrandRepository } from "@/contexts/catalogue/brand/infrastructure/drizzle-brand-repository";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import z from "zod";

export const GET = routeHandler(
  {
    name: "get-product-brands",
  },
  async ({ organization }) => {
    const service = new ListBrands(new DrizzleBrandRepository());
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
    const service = new CreateBrand(new DrizzleBrandRepository());
    await service.execute(body.name, organization.id);
    return HttpNextResponse.noResponse(201);
  },
);
