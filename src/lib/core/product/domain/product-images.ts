import { ValueObject } from "@/lib/types/value-object";

export class ProductImages extends ValueObject<Array<string>> {
  constructor(value: Array<string>) {
    super(value);
  }

  protected validation(value: Array<string>): void {
    if (!Array.isArray(value)) {
      throw new Error("ProductImages must be an array of strings");
    }
    for (const url of value) {
      if (typeof url !== "string" || url.length === 0) {
        throw new Error("Each image URL must be a non-empty string");
      }
    }
  }
}
