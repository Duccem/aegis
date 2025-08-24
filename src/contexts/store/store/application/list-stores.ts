import { Criteria, Operator } from "@/contexts/shared/domain/criteria";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { Store } from "../domain/store";
import { StoreRepository } from "../domain/store-repository";

export class ListStores {
  constructor(private readonly repository: StoreRepository) {}

  async execute(organizationId: string): Promise<Primitives<Store>[]> {
    const criteria = Criteria.withFilters([
      { field: "organizationId", value: organizationId, operator: Operator.EQUAL },
    ]);

    const stores = await this.repository.search(criteria);

    return stores.map((store) => store.toPrimitives());
  }
}
