import { Enum } from "@/contexts/shared/domain/value-objects/enum";

export enum ItemTypeEnum {
  PRODUCT = "product",
  SERVICE = "service",
}

export class ItemType extends Enum<ItemTypeEnum> {
  constructor(value: ItemTypeEnum) {
    super(value, Object.values(ItemTypeEnum));
  }

  static fromString(value: string): ItemType {
    if (!Object.values(ItemTypeEnum).includes(value as ItemTypeEnum)) {
      throw new Error(`Invalid item type: ${value}`);
    }
    return new ItemType(value as ItemTypeEnum);
  }

  static product(): ItemType {
    return new ItemType(ItemTypeEnum.PRODUCT);
  }

  static service(): ItemType {
    return new ItemType(ItemTypeEnum.SERVICE);
  }
}
