import { ListItems } from "@/contexts/catalogue/item/application/list-items";
import { CreateItem } from "@/contexts/catalogue/item/application/save-item";
import { ItemSKUExist } from "@/contexts/catalogue/item/domain/errors/item-sku-exist";
import { DrizzleItemRepository } from "@/contexts/catalogue/item/infrastructure/drizzle-item-repository";
import { Direction } from "@/contexts/shared/domain/criteria";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { paginateSchema } from "@/contexts/shared/infrastructure/http/paginate-schema";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
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
    const service = new CreateItem(new DrizzleItemRepository());
    await service.execute({
      ...body,
      organizationId: organization.id,
    });
    return HttpNextResponse.noResponse(201);
  },
  (error: ItemSKUExist) => {
    switch (true) {
      case error instanceof ItemSKUExist:
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
    const service = new ListItems(new DrizzleItemRepository());
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
