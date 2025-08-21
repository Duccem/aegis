import { Aggregate } from "@/lib/types/aggregate";
import { Primitives } from "@/lib/types/primitives";
import { DateValueObject, StringValueObject } from "@/lib/types/value-object";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { StoreStatus } from "./store-status";

export class Store extends Aggregate {
  constructor(
    id: Uuid,
    public name: StoreName,
    public address: StoreAddress,
    public status: StoreStatus,
    public organizationId: Uuid,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Store> {
    return {
      id: this.id.value,
      name: this.name.value,
      address: this.address.value,
      status: this.status.value,
      organizationId: this.organizationId.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(primitives: Primitives<Store>): Store {
    return new Store(
      new Uuid(primitives.id),
      new StoreName(primitives.name),
      new StoreAddress(primitives.address),
      StoreStatus.fromString(primitives.status),
      new Uuid(primitives.organizationId),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt),
    );
  }

  static create(name: string, address: string, organizationId: string): Store {
    return new Store(
      Uuid.random(),
      new StoreName(name),
      new StoreAddress(address),
      StoreStatus.active(),
      Uuid.fromString(organizationId),
      DateValueObject.today(),
      DateValueObject.today(),
    );
  }
}

export class StoreName extends StringValueObject {}
export class StoreAddress extends StringValueObject {}
