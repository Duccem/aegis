import { Aggregate } from "@/contexts/shared/domain/aggregate";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { DateValueObject, StringValueObject } from "@/contexts/shared/domain/value-object";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { StoreStatus } from "./store-status";

export class Store extends Aggregate {
  constructor(
    id: StoreId,
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
      new StoreId(primitives.id),
      new StoreName(primitives.name),
      new StoreAddress(primitives.address),
      new StoreStatus(primitives.status),
      new Uuid(primitives.organizationId),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt),
    );
  }

  static create(name: string, address: string, organizationId: string) {
    return new Store(
      StoreId.random(),
      new StoreName(name),
      new StoreAddress(address),
      StoreStatus.active(),
      new Uuid(organizationId),
      DateValueObject.today(),
      DateValueObject.today(),
    );
  }

  update(name?: string, address?: string) {
    this.name = name ? new StoreName(name) : this.name;
    this.address = address ? new StoreAddress(address) : this.address;
  }

  toggleStatus() {
    this.status = this.status.isActive() ? StoreStatus.inactive() : StoreStatus.active();
  }
}

export class StoreId extends Uuid {}
export class StoreName extends StringValueObject {}
export class StoreAddress extends StringValueObject {}
