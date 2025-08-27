import { Enum } from "@/contexts/shared/domain/value-objects/enum";

export enum MovementTypeEnum {
  ADDITION = "addition",
  REMOVAL = "removal",
  TRANSFER = "transfer",
}
export class MovementType extends Enum<MovementTypeEnum> {
  constructor(value: MovementTypeEnum) {
    super(value, Object.values(MovementTypeEnum));
  }

  static fromString(value: string) {
    if (!Object.values(MovementTypeEnum).includes(value as MovementTypeEnum)) {
      throw new Error(`Invalid MovementType value: ${value}`);
    }
    return new MovementType(value as MovementTypeEnum);
  }

  static addition() {
    return new MovementType(MovementTypeEnum.ADDITION);
  }

  static removal() {
    return new MovementType(MovementTypeEnum.REMOVAL);
  }

  static transfer() {
    return new MovementType(MovementTypeEnum.TRANSFER);
  }
  isAddition() {
    return this.value === MovementTypeEnum.ADDITION;
  }
  isTransfer() {
    return this.value === MovementTypeEnum.TRANSFER;
  }
  isRemoval() {
    return this.value === MovementTypeEnum.REMOVAL;
  }
}
