import { FilterItemById } from "../domain/criteria/filter-by-id";
import { CannotUpdateItemError } from "../domain/errors/cannot-update-item";
import { ItemNotFound } from "../domain/errors/item-not-found";
import { ItemRepository } from "../domain/item-repository";
import { CanUpdateItem } from "../domain/specification/can-update-item";

export type RemoveImageError = ItemNotFound | CannotUpdateItemError;

export class RemoveImage {
  constructor(private readonly repository: ItemRepository) {}

  async execute(itemId: string, organizationId: string, imageUrl: string): Promise<void> {
    const item = await this.repository.find(FilterItemById.fromString(itemId));
    if (!item) {
      throw new ItemNotFound(itemId);
    }

    if (!CanUpdateItem.forOrganization(organizationId).isSatisfiedBy(item)) {
      throw new CannotUpdateItemError();
    }

    item.removeImage(imageUrl);
    await this.repository.save(item);
  }
}
