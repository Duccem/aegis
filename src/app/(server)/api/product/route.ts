import { ListProducts } from "@/lib/core/product/application/list-products";
import { CreateProduct } from "@/lib/core/product/application/save-product";
import { ProductSKUExist } from "@/lib/core/product/domain/product-sku-exist-error";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { paginateSchema } from "@/lib/http/paginate-schema";
import { routeHandler } from "@/lib/http/route-handler";
import { Direction } from "@/lib/types/criteria";
import { unstable_cache as cache } from "next/cache";
import z from "zod";
const saveProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().min(1, "Description is required"),
  cost: z.number().min(0, "Cost must be a positive number"),
  price: z.number().min(0, "Price must be a positive number"),
  images: z.array(z.string()),
  categories: z.array(z.string()),
  unitId: z.string(),
  brandId: z.string(),
});

export const POST = routeHandler(
  {
    name: "create-product",
    schema: saveProductSchema,
  },
  async ({ body, organization }) => {
    const service = new CreateProduct(new DrizzleProductRepository());
    await service.execute({
      ...body,
      organizationId: organization.id,
    });
    return HttpNextResponse.noResponse(201);
  },
  (error: ProductSKUExist) => {
    switch (true) {
      case error instanceof ProductSKUExist:
        return HttpNextResponse.domainError(error, 400);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);

const getProductSchema = z
  .object({
    query: z.string().optional(),
    brandId: z.string().optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    minCost: z.coerce.number().optional(),
    maxCost: z.coerce.number().optional(),
  })
  .merge(paginateSchema);

export const GET = routeHandler(
  {
    name: "get-product",
    querySchema: getProductSchema,
  },
  async ({ searchParams, organization }) => {
    const service = new ListProducts(new DrizzleProductRepository());
    const filters = {
      organizationId: organization.id,
      query: searchParams.query,
      brandId: searchParams.brandId,
      priceRange:
        searchParams.minPrice && searchParams.maxPrice
          ? { min: searchParams.minPrice, max: searchParams.maxPrice }
          : undefined,
      costRange:
        searchParams.minCost && searchParams.maxCost
          ? { min: searchParams.minCost, max: searchParams.maxCost }
          : undefined,
    };

    const order = {
      field: searchParams.sort || "createdAt",
      order: (searchParams.order as Direction) || "ASC",
    };

    const pagination = {
      limit: searchParams.limit ? searchParams.limit : 10,
      offset: searchParams.page ? searchParams.page - 1 : 0,
    };

    const data = await cache(
      () => service.execute(filters, order, pagination),
      ["get-products", JSON.stringify(filters), JSON.stringify(order), JSON.stringify(pagination)],
      {
        tags: [`products:${organization.id}`],
        revalidate: 60 * 60, // 1 hour
      },
    )();

    return HttpNextResponse.json({ data });
  },
);
