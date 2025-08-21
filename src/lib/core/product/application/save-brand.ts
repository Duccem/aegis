import { Brand } from "../domain/brand";
import { ProductRepository } from "../domain/product.repository";

export class CreateBrand {
  constructor(private repository: ProductRepository) {}

  async execute(name: string, organizationId: string): Promise<void> {
    const brand = Brand.create(name, organizationId);
    await this.repository.saveBrand(brand);
  }
}
