import { Uuid } from "@/lib/types/value-objects/uuid";
import { ProductRepository } from "../domain/product.repository";

export class GetProductMetrics {
  constructor(private readonly repository: ProductRepository) {}

  async execute(organizationId: string): Promise<{
    totalProducts: number;
    totalProductsThisMonth: number;
    totalActiveProducts: number;
  }> {
    const metrics = await this.repository.metrics(Uuid.fromString(organizationId));
    return metrics;
  }
}
