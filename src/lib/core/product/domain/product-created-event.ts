import { DomainEvent, DomainEventPrimitives } from "@/lib/types/domain-event";
import { Uuid } from "@/lib/types/value-objects/uuid";

export type ProductCreatedData = {
  id: string;
  name: string;
};

export class ProductCreated extends DomainEvent<ProductCreatedData> {
  static readonly NAME = "product.created";

  constructor(productId: string, productName: string, eventId?: string, occurredOn?: Date) {
    super(
      eventId ?? Uuid.random().toString(),
      occurredOn ?? new Date(),
      productId,
      ProductCreated.NAME,
      {
        id: productId,
        name: productName,
      }
    );
  }

  static dispatch(productId: string, productName: string): ProductCreated {
    return new ProductCreated(productId, productName);
  }

  static fromPrimitives(params: DomainEventPrimitives<ProductCreatedData>): ProductCreated {
    return new ProductCreated(params.aggregate, params.data.name, params.id, params.occurred_on);
  }

  public toPrimitive(): DomainEventPrimitives<ProductCreatedData> {
    return {
      id: this.id,
      occurred_on: this.occurred_on,
      name: this.name,
      aggregate: this.aggregate,
      data: this.data,
    };
  }
}
