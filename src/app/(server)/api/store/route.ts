import { ListStores } from "@/lib/core/store/application/list-stores";
import { SaveStore } from "@/lib/core/store/application/save-store";
import { DrizzleStoreRepository } from "@/lib/core/store/infrastructure/drizzle-store-repository";
import { HttpNextResponse } from "@/lib/http/http-response";
import { paginateSchema } from "@/lib/http/paginate-schema";
import { routeHandler } from "@/lib/http/route-handler";
import { Direction } from "@/lib/types/criteria";
import z from "zod";

const saveStoreSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
});

export const POST = routeHandler(
  { name: "save-store", schema: saveStoreSchema },
  async ({ body, organization }) => {
    const service = new SaveStore(new DrizzleStoreRepository());
    await service.execute({
      name: body.name,
      address: body.address,
      organizationId: organization.id,
    });
    return HttpNextResponse.noResponse(201);
  },
);

const listStoresSchema = z
  .object({
    query: z.string().optional(),
  })
  .merge(paginateSchema);

export const GET = routeHandler(
  { name: "list-stores", querySchema: listStoresSchema },
  async ({ searchParams, organization }) => {
    const service = new ListStores(new DrizzleStoreRepository());

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
    const { items, meta } = await service.execute(filters, order, pagination);
    return HttpNextResponse.json({ items, meta });
  },
);
