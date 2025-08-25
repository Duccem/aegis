import { Aggregate } from "@/contexts/shared/domain/aggregate";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { DateValueObject, NumberValueObject } from "@/contexts/shared/domain/value-object";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";

export class Stock extends Aggregate {
  constructor(
    id: StockId,
    public itemId: Uuid,
    public storeId: Uuid,
    public organizationId: Uuid,
    public quantity: StockQuantity,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Stock> {
    return {
      id: this.id.value,
      itemId: this.itemId.value,
      storeId: this.storeId.value,
      quantity: this.quantity.value,
      organizationId: this.organizationId.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(primitives: Primitives<Stock>): Stock {
    return new Stock(
      new StockId(primitives.id),
      new Uuid(primitives.itemId),
      new Uuid(primitives.storeId),
      new Uuid(primitives.organizationId),
      new StockQuantity(primitives.quantity),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt),
    );
  }

  static create(itemId: string, storeId: string, organizationId: string): Stock {
    return new Stock(
      StockId.random(),
      new Uuid(itemId),
      new Uuid(storeId),
      new Uuid(organizationId),
      StockQuantity.zero(),
      DateValueObject.today(),
      DateValueObject.today(),
    );
  }

  increase(quantity: number): void {
    this.quantity = this.quantity.add(quantity);
    this.updatedAt = DateValueObject.today();
  }

  decrease(quantity: number): void {
    this.quantity = this.quantity.subtract(quantity);
    this.updatedAt = DateValueObject.today();
  }
}

export class StockId extends Uuid {}
export class StockQuantity extends NumberValueObject {
  static zero(): StockQuantity {
    return new StockQuantity(0);
  }

  add(quantity: number) {
    return new StockQuantity(this.value + quantity);
  }

  subtract(quantity: number) {
    if (this.value - quantity < 0) {
      return StockQuantity.zero();
    }
    return new StockQuantity(this.value - quantity);
  }
}
