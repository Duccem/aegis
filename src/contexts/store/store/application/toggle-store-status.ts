import { CanUpdateStore } from "../domain/can-update-store";
import { CannotUpdateStore } from "../domain/cannot-update-store";
import { FilterById } from "../domain/filter-by-id";
import { StoreNotFound } from "../domain/store-not-found";
import { StoreRepository } from "../domain/store-repository";

export type ToggleStoreStatusError = StoreNotFound | CannotUpdateStore;

export class ToggleStoreStatus {
  constructor(private readonly repository: StoreRepository) {}

  async execute(id: string, organizationId: string): Promise<void> {
    const store = await this.repository.find(FilterById.fromString(id));

    if (!store) {
      throw new StoreNotFound(id);
    }

    if (CanUpdateStore.forOrganization(organizationId).not().isSatisfiedBy(store)) {
      throw new CannotUpdateStore();
    }

    store.toggleStatus();

    await this.repository.save(store);
  }
}
