import { Aggregate } from "@/contexts/shared/domain/aggregate";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { DateValueObject, NumberValueObject } from "@/contexts/shared/domain/value-object";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { AdditionMovementCreated } from "./addition-movement-created";
import { MovementType } from "./movement-type";
import { RemovalMovementCreated } from "./removal-movement-created";
import { TransferMovementCreated } from "./transfer-movement-created";

export class Movement extends Aggregate {
  constructor(
    id: Uuid,
    public itemId: Uuid,
    public originStoreId: Uuid | undefined,
    public targetStoreId: Uuid,
    public organizationId: Uuid,
    public type: MovementType,
    public quantity: MovementQuantity,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Movement> {
    return {
      id: this.id.value,
      itemId: this.itemId.value,
      originStoreId: this.originStoreId ? this.originStoreId.value : undefined,
      targetStoreId: this.targetStoreId.value,
      organizationId: this.organizationId.value,
      type: this.type.value,
      quantity: this.quantity.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(primitives: Primitives<Movement>): Movement {
    return new Movement(
      new Uuid(primitives.id),
      new Uuid(primitives.itemId),
      primitives.originStoreId ? new Uuid(primitives.originStoreId) : undefined,
      new Uuid(primitives.targetStoreId),
      new Uuid(primitives.organizationId),
      MovementType.fromString(primitives.type),
      new MovementQuantity(primitives.quantity),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt),
    );
  }

  static create(
    itemId: string,
    storeId: string,
    organizationId: string,
    type: string,
    quantity: number,
  ): Movement {
    const movement = new Movement(
      Uuid.random(),
      new Uuid(itemId),
      undefined,
      new Uuid(storeId),
      new Uuid(organizationId),
      MovementType.fromString(type),
      new MovementQuantity(quantity),
      DateValueObject.today(),
      DateValueObject.today(),
    );
    if (movement.type.isAddition()) {
      movement.record(AdditionMovementCreated.dispatch(itemId, storeId, organizationId, quantity));
    } else if (movement.type.isRemoval()) {
      movement.record(RemovalMovementCreated.dispatch(itemId, storeId, organizationId, quantity));
    }

    return movement;
  }

  static transfer(
    itemId: string,
    originStoreId: string,
    targetStoreId: string,
    organizationId: string,
    quantity: number,
  ): Movement {
    const movement = new Movement(
      Uuid.random(),
      new Uuid(itemId),
      new Uuid(originStoreId),
      new Uuid(targetStoreId),
      new Uuid(organizationId),
      MovementType.transfer(),
      new MovementQuantity(quantity),
      DateValueObject.today(),
      DateValueObject.today(),
    );
    movement.record(
      TransferMovementCreated.dispatch(
        itemId,
        originStoreId,
        targetStoreId,
        organizationId,
        quantity,
      ),
    );
    return movement;
  }
}

export class MovementQuantity extends NumberValueObject {}
