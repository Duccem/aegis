import { Enum } from "@/lib/types/value-objects/enum";

export enum ProductStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
}

export class ProductStatus extends Enum<ProductStatusEnum> {
  constructor(value: ProductStatusEnum) {
    super(value, Object.values(ProductStatusEnum));
  }

  static active(): ProductStatus {
    return new ProductStatus(ProductStatusEnum.ACTIVE);
  }

  static inactive(): ProductStatus {
    return new ProductStatus(ProductStatusEnum.INACTIVE);
  }

  static archived(): ProductStatus {
    return new ProductStatus(ProductStatusEnum.ARCHIVED);
  }

  static fromString(value: string): ProductStatus {
    switch (value) {
      case ProductStatusEnum.ACTIVE:
        return ProductStatus.active();
      case ProductStatusEnum.INACTIVE:
        return ProductStatus.inactive();
      case ProductStatusEnum.ARCHIVED:
        return ProductStatus.archived();
      default:
        throw new Error(`Invalid product status: ${value}`);
    }
  }

  isActive(): boolean {
    return this.value === ProductStatusEnum.ACTIVE;
  }
}
