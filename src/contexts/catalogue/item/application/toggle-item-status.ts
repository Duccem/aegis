import { FilterItemById } from "../domain/criteria/filter-by-id";
import { CannotUpdateItemError } from "../domain/errors/cannot-update-item";
import { ItemNotFound } from "../domain/errors/item-not-found";
import { ItemRepository } from "../domain/item-repository";
import { CanUpdateItem } from "../domain/specification/can-update-item";

export type ToggleItemStatusError = ItemNotFound | CannotUpdateItemError;

export class ToggleItemStatus {
  constructor(private readonly repository: ItemRepository) {}

  async execute(itemId: string, organizationId: string) {
    const item = await this.repository.find(FilterItemById.fromString(itemId));

    if (!item) {
      throw new ItemNotFound(itemId);
    }

    if (!CanUpdateItem.forOrganization(organizationId).isSatisfiedBy(item)) {
      throw new CannotUpdateItemError();
    }

    item.toggleStatus();

    await this.repository.save(item);
  }
}
