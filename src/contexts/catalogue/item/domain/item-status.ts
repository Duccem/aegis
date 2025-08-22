import { Enum } from "@/contexts/shared/domain/value-objects/enum";

export enum ItemStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
}

export class ItemStatus extends Enum<ItemStatusEnum> {
  constructor(value: ItemStatusEnum) {
    super(value, Object.values(ItemStatusEnum));
  }

  static active(): ItemStatus {
    return new ItemStatus(ItemStatusEnum.ACTIVE);
  }

  static inactive(): ItemStatus {
    return new ItemStatus(ItemStatusEnum.INACTIVE);
  }

  static archived(): ItemStatus {
    return new ItemStatus(ItemStatusEnum.ARCHIVED);
  }

  static fromString(value: string): ItemStatus {
    switch (value) {
      case ItemStatusEnum.ACTIVE:
        return ItemStatus.active();
      case ItemStatusEnum.INACTIVE:
        return ItemStatus.inactive();
      case ItemStatusEnum.ARCHIVED:
        return ItemStatus.archived();
      default:
        throw new Error(`Invalid item status: ${value}`);
    }
  }

  isActive(): boolean {
    return this.value === ItemStatusEnum.ACTIVE;
  }
}
