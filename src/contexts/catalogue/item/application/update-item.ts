import { FilterItemById } from "../domain/criteria/filter-by-id";
import { CannotUpdateItemError } from "../domain/errors/cannot-update-item";
import { ItemNotFound } from "../domain/errors/item-not-found";
import { ItemRepository } from "../domain/item-repository";
import { CanUpdateItem } from "../domain/specification/can-update-item";

export type UpdateItemPayload = {
  name: string;
  sku: string;
  description: string;
  brandId: string;
  unitId: string;
  categories: string[];
};

export type UpdateItemErrors = ItemNotFound | CannotUpdateItemError;

export class UpdateItem {
  constructor(private repository: ItemRepository) {}

  async execute(itemId: string, organizationId: string, payload: UpdateItemPayload): Promise<void> {
    const item = await this.repository.find(FilterItemById.fromString(itemId));

    if (!item) {
      throw new ItemNotFound(itemId);
    }

    if (!CanUpdateItem.forOrganization(organizationId).isSatisfiedBy(item)) {
      throw new CannotUpdateItemError();
    }

    item.update(
      payload.name,
      payload.sku,
      payload.description,
      payload.unitId,
      payload.brandId,
      payload.categories,
    );

    await this.repository.save(item);
  }
}
