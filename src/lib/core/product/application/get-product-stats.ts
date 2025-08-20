import { Criteria } from "@/lib/types/criteria";
import { ProductRepository } from "../domain/product.repository";

export class GetProductStats {
  constructor(private readonly repository: ProductRepository) {}

  async execute() {
    const products = await this.repository.find(Criteria.empty());
  }
}
