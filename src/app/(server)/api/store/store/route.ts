import { HttpNextResponse } from "@/contexts/shared/infrastructure/http/http-response";
import { routeHandler } from "@/contexts/shared/infrastructure/http/route-handler";
import { CreateStore, CreateStoreError } from "@/contexts/store/store/application/create-store";
import { ListStores } from "@/contexts/store/store/application/list-stores";
import { StoreNameExist } from "@/contexts/store/store/domain/store-name-exist";
import { DrizzleStoreRepository } from "@/contexts/store/store/infrastructure/drizzle-store-repository";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import z from "zod";

export const POST = routeHandler(
  {
    name: "create-store",
    schema: z.object({
      name: z.string().min(1, "Name is required"),
      address: z.string().min(1, "Address is required"),
    }),
  },
  async ({ organization, body }) => {
    const service = new CreateStore(new DrizzleStoreRepository());
    await service.execute({
      name: body.name,
      address: body.address,
      organizationId: organization.id,
    });
    revalidateTag(`stores:${organization.id}`);
    return HttpNextResponse.noResponse(201);
  },
  (error: CreateStoreError) => {
    switch (true) {
      case error instanceof StoreNameExist:
        return HttpNextResponse.domainError(error, 400);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);

export const GET = routeHandler({ name: "get-stores" }, async ({ organization }) => {
  const service = new ListStores(new DrizzleStoreRepository());
  const stores = await cache(() => service.execute(organization.id), ["stores", organization.id], {
    tags: [`stores:${organization.id}`],
    revalidate: 60 * 60,
  })();
  return HttpNextResponse.json({ stores });
});
