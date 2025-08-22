import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { ItemRepository } from "../domain/item-repository";

export class GetItemsMetrics {
  constructor(private readonly repository: ItemRepository) {}

  async execute(organizationId: string): Promise<{
    totalProducts: number;
    totalProductsThisMonth: number;
    totalActiveProducts: number;
  }> {
    const metrics = await this.repository.metrics(Uuid.fromString(organizationId));
    return metrics;
  }
}
