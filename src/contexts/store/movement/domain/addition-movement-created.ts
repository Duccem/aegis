import { DomainEvent, DomainEventPrimitives } from "@/contexts/shared/domain/domain-event";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";

export type AdditionMovementCreatedData = {
  itemId: string;
  storeId: string;
  organizationId: string;
  quantity: number;
};

export class AdditionMovementCreated extends DomainEvent<AdditionMovementCreatedData> {
  static readonly NAME = "store/movement.addition_created";

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
      AdditionMovementCreated.NAME,
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
  ): AdditionMovementCreated {
    return new AdditionMovementCreated(itemId, storeId, organizationId, quantity);
  }

  static fromPrimitives(
    params: DomainEventPrimitives<AdditionMovementCreatedData>,
  ): AdditionMovementCreated {
    return new AdditionMovementCreated(
      params.data.itemId,
      params.data.storeId,
      params.data.organizationId,
      params.data.quantity,
      params.id,
      params.occurred_on,
    );
  }

  public toPrimitive(): DomainEventPrimitives<AdditionMovementCreatedData> {
    return {
      id: this.id,
      occurred_on: this.occurred_on,
      name: this.name,
      aggregate: this.aggregate,
      data: this.data,
    };
  }
}
