import { NumberValueObject } from "@/lib/types/value-object";

export class ProductCost extends NumberValueObject {
  public validation(value: number): void {
    if (value < 0) {
      throw new Error("Product cost cannot be negative");
    }
  }
}
export class ProductPrice extends NumberValueObject {
  public validation(value: number): void {
    if (value < 0) {
      throw new Error("Product price cannot be negative");
    }
  }
}
