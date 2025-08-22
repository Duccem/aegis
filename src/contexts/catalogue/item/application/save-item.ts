import { Criteria, Operator } from "@/contexts/shared/domain/criteria";
import { ItemSKUExist } from "../domain/errors/item-sku-exist";
import { Item } from "../domain/item";
import { ItemRepository } from "../domain/item-repository";

export type CreateItemData = {
  name: string;
  sku: string;
  description: string;
  images: string[];
  unitId: string;
  brandId: string;
  categories?: string[];
  organizationId: string;
  type: "product" | "service";
};

export class CreateItem {
  constructor(private readonly repository: ItemRepository) {}

  async execute(data: CreateItemData): Promise<void> {
    const existingItem = await this.repository.find(
      Criteria.withFilters([{ field: "sku", operator: Operator.EQUAL, value: data.sku }]),
    );

    if (existingItem) {
      throw ItemSKUExist.withSku(data.sku);
    }

    const item = Item.create(
      data.name,
      data.sku,
      data.description,
      data.images,
      data.unitId,
      data.brandId,
      data.categories ?? [],
      data.organizationId,
      data.type,
    );

    await this.repository.save(item);
  }
}
