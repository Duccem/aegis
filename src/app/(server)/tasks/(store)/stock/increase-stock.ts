import { inngest } from "@/contexts/shared/infrastructure/inngest";
import { IncreaseStock } from "@/contexts/store/stock/application/increase-stock";
import { DrizzleStockRepository } from "@/contexts/store/stock/infrastructure/drizzle-stock-repository";

export const increaseStock = inngest.createFunction(
  { id: "increase-stock" },
  { event: "store/movement.increase" },
  async ({ event }) => {
    const service = new IncreaseStock(new DrizzleStockRepository());
    const { itemId, organizationId, storeId, quantity } = event.data;
    await service.execute(itemId, storeId, organizationId, quantity);
    return { success: true };
  },
);
