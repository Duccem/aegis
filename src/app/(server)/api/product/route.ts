import { ListProducts } from "@/lib/core/product/application/list-products";
import { CreateProduct } from "@/lib/core/product/application/save-product";
import { ProductSKUExist } from "@/lib/core/product/domain/product-sku-exist-error";
import { DrizzleProductRepository } from "@/lib/core/product/infrastructure/drizzle-product-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { paginateSchema } from "@/lib/http/paginate-schema";
import { routeHandler } from "@/lib/http/route-handler";
import { Direction } from "@/lib/types/criteria";
import z from "zod";
const saveProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string()),
  categories: z.array(z.string()),
  type: z.enum(["product", "service"]),
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
    };

    const order = {
      field: searchParams.sort || "createdAt",
      order: (searchParams.order as Direction) || "ASC",
    };

    const pagination = {
      limit: searchParams.limit ? searchParams.limit : 10,
      offset: searchParams.page ? searchParams.page - 1 : 0,
    };

    const data = await service.execute(filters, order, pagination);

    return HttpNextResponse.json(data);
  },
);
