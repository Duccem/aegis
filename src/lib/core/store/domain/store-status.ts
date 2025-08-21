import { Enum } from "@/lib/types/value-objects/enum";

export enum StoreStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
  CLOSED = "closed",
}

export class StoreStatus extends Enum<StoreStatusEnum> {
  constructor(value: StoreStatusEnum) {
    super(value, Object.values(StoreStatusEnum));
  }

  public static fromString(value: string): StoreStatus {
    if (!Object.values(StoreStatusEnum).includes(value as StoreStatusEnum)) {
      throw new Error(`Invalid store status: ${value}`);
    }
    return new StoreStatus(value as StoreStatusEnum);
  }

  static active(): StoreStatus {
    return new StoreStatus(StoreStatusEnum.ACTIVE);
  }
  static inactive(): StoreStatus {
    return new StoreStatus(StoreStatusEnum.INACTIVE);
  }
  static closed(): StoreStatus {
    return new StoreStatus(StoreStatusEnum.CLOSED);
  }
}
