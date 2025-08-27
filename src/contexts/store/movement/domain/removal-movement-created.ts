import { DomainEvent, DomainEventPrimitives } from "@/contexts/shared/domain/domain-event";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";

export type RemovalMovementCreatedData = {
  itemId: string;
  storeId: string;
  organizationId: string;
  quantity: number;
};

export class RemovalMovementCreated extends DomainEvent<RemovalMovementCreatedData> {
  static readonly NAME = "store/movement.removal_created";

  constructor(
    itemId: string,
    storeId: string,
    organizationId: string,
    quantity: number,
    eventId?: string,
    occurredOn?: Date,
  ) {
    super(
      eventId ?? Uuid.random().toString(),
      occurredOn ?? new Date(),
      itemId,
      RemovalMovementCreated.NAME,
      {
        itemId,
        storeId,
        organizationId,
        quantity,
      },
    );
  }

  static dispatch(
    itemId: string,
    storeId: string,
    organizationId: string,
    quantity: number,
  ): RemovalMovementCreated {
    return new RemovalMovementCreated(itemId, storeId, organizationId, quantity);
  }

  static fromPrimitives(
    params: DomainEventPrimitives<RemovalMovementCreatedData>,
  ): RemovalMovementCreated {
    return new RemovalMovementCreated(
      params.data.itemId,
      params.data.storeId,
      params.data.organizationId,
      params.data.quantity,
      params.id,
      params.occurred_on,
    );
  }

  public toPrimitive(): DomainEventPrimitives<RemovalMovementCreatedData> {
    return {
      id: this.id,
      occurred_on: this.occurred_on,
      name: this.name,
      aggregate: this.aggregate,
      data: this.data,
    };
  }
}
