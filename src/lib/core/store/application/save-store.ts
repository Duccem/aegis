import { Store } from "../domain/store";
import { StoreRepository } from "../domain/store-repository";

export type SaveStorePayload = {
  name: string;
  address: string;
  organizationId: string;
};

export class SaveStore {
  constructor(private readonly repository: StoreRepository) {}

  async execute(data: SaveStorePayload) {
    const store = Store.create(data.name, data.address, data.organizationId);

    await this.repository.save(store);
  }
}
