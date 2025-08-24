import { Criteria, Operator } from "@/contexts/shared/domain/criteria";
import { Store } from "../domain/store";
import { StoreNameExist } from "../domain/store-name-exist";
import { StoreRepository } from "../domain/store-repository";

export type CreateStoreCommand = {
  name: string;
  address: string;
  organizationId: string;
};

export type CreateStoreError = StoreNameExist;

export class CreateStore {
  constructor(private readonly repository: StoreRepository) {}

  async execute(command: CreateStoreCommand): Promise<void> {
    await this.ensureStoreNameIsUnique(command.name, command.organizationId);

    const store = Store.create(command.name, command.address, command.organizationId);

    await this.repository.save(store);
  }

  private async ensureStoreNameIsUnique(name: string, organizationId: string): Promise<void> {
    const criteria = Criteria.withFilters([
      { field: "name", operator: Operator.EQUAL, value: name },
      { field: "organizationId", operator: Operator.EQUAL, value: organizationId },
    ]);

    const existingStore = await this.repository.find(criteria);
    if (existingStore) {
      throw new StoreNameExist(name, organizationId);
    }
  }
}
