import { inngest } from "@/contexts/shared/infrastructure/inngest";
import { DecreaseStock } from "@/contexts/store/stock/application/decrease-stock";
import { DrizzleStockRepository } from "@/contexts/store/stock/infrastructure/drizzle-stock-repository";

export const increaseStock = inngest.createFunction(
  { id: "increase-stock" },
  { event: "store/movement.decrease" },
  async ({ event }) => {
    const service = new DecreaseStock(new DrizzleStockRepository());
    const { itemId, organizationId, storeId, quantity } = event.data;
    await service.execute(itemId, storeId, organizationId, quantity);
    return { success: true };
  },
);
