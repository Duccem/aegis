import { Direction } from "@/contexts/shared/domain/criteria";
import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { paginateSchema } from "@/contexts/shared/infrastructure/http/paginate-schema";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import { InngestEventBus } from "@/contexts/shared/infrastructure/inngest/inngest-event-bus";
import { ListMovements } from "@/contexts/store/movement/application/list-movements";
import { TransferMovement } from "@/contexts/store/movement/application/transfer-movement";
import { DrizzleMovementRepository } from "@/contexts/store/movement/infrastructure/drizzle-movement-repository";
import { unstable_cache as cache } from "next/cache";
import z from "zod";

export const GET = routeHandler(
  {
    name: "list-movements",
    querySchema: z
      .object({
        itemId: z.uuid().optional(),
        originStoreId: z.uuid().optional(),
        targetStoreId: z.uuid().optional(),
        type: z.enum(["addition", "removal", "transfer"]).optional(),
      })
      .merge(paginateSchema),
  },
  async ({ organization, searchParams }) => {
    const service = new ListMovements(new DrizzleMovementRepository());

    const filters = {
      itemId: searchParams.itemId,
      originStoreId: searchParams.originStoreId,
      targetStoreId: searchParams.targetStoreId,
      type: searchParams.type,
    };

    const order = {
      field: searchParams.sort || "createdAt",
      order: (searchParams.order as Direction) || "ASC",
    };

    const pagination = {
      limit: searchParams.limit ? searchParams.limit : 10,
      offset: searchParams.page ? searchParams.page - 1 : 0,
    };

    const movements = await cache(
      () => service.execute(organization.id, filters, order, pagination),
      [
        "movements",
        organization.id,
        JSON.stringify(filters),
        JSON.stringify(order),
        JSON.stringify(pagination),
      ],
      {
        revalidate: 60 * 60,
        tags: [`movements:${organization.id}`],
      },
    )();

    return HttpNextResponse.json(movements);
  },
);

export const POST = routeHandler(
  {
    name: "transfer-stock",
    schema: z.object({
      itemId: z.uuid(),
      quantity: z.coerce.number().min(1),
      originStoreId: z.uuid(),
      targetStoreId: z.uuid(),
    }),
  },
  async ({ organization, body }) => {
    const service = new TransferMovement(new DrizzleMovementRepository(), new InngestEventBus());

    await service.execute(
      body.itemId,
      body.originStoreId,
      body.targetStoreId,
      organization.id,
      body.quantity,
    );
    return HttpNextResponse.noResponse(201);
  },
);
