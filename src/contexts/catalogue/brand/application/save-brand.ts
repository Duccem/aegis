import { Brand } from "../domain/brand";
import { BrandRepository } from "../domain/brand-repository";

export class CreateBrand {
  constructor(private repository: BrandRepository) {}

  async execute(name: string, organizationId: string): Promise<void> {
    const brand = Brand.create(name, organizationId);
    await this.repository.save(brand);
  }
}
