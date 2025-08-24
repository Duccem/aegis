import { Enum } from "@/contexts/shared/domain/value-objects/enum";

export enum StoreStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
  CLOSED = "closed",
}

export class StoreStatus extends Enum<StoreStatusEnum> {
  constructor(value: StoreStatusEnum) {
    super(value, Object.values(StoreStatusEnum));
  }

  isActive(): boolean {
    return this.value === StoreStatusEnum.ACTIVE;
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
