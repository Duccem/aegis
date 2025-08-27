import { DomainEvent, DomainEventPrimitives } from "@/contexts/shared/domain/domain-event";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";

export type TransferMovementCreatedData = {
  itemId: string;
  originStoreId: string;
  targetStoreId: string;
  organizationId: string;
  quantity: number;
};

export class TransferMovementCreated extends DomainEvent<TransferMovementCreatedData> {
  static readonly NAME = "store/movement.transfer_created";

  constructor(
    itemId: string,
    originStoreId: string,
    targetStoreId: string,
    organizationId: string,
    quantity: number,
    eventId?: string,
    occurredOn?: Date,
  ) {
    super(
      eventId ?? Uuid.random().toString(),
      occurredOn ?? new Date(),
      itemId,
      TransferMovementCreated.NAME,
      {
        itemId,
        originStoreId,
        targetStoreId,
        organizationId,
        quantity,
      },
    );
  }

  static dispatch(
    itemId: string,
    originStoreId: string,
    targetStoreId: string,
    organizationId: string,
    quantity: number,
  ): TransferMovementCreated {
    return new TransferMovementCreated(
      itemId,
      originStoreId,
      targetStoreId,
      organizationId,
      quantity,
    );
  }

  static fromPrimitives(
    params: DomainEventPrimitives<TransferMovementCreatedData>,
  ): TransferMovementCreated {
    return new TransferMovementCreated(
      params.data.itemId,
      params.data.originStoreId,
      params.data.targetStoreId,
      params.data.organizationId,
      params.data.quantity,
      params.id,
      params.occurred_on,
    );
  }

  public toPrimitive(): DomainEventPrimitives<TransferMovementCreatedData> {
    return {
      id: this.id,
      occurred_on: this.occurred_on,
      name: this.name,
      aggregate: this.aggregate,
      data: this.data,
    };
  }
}
