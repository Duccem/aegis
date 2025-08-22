import { ValueObject } from "@/contexts/shared/domain/value-object";

export class ItemImages extends ValueObject<Array<string>> {
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

  addImage(imageUrl: string): void {
    if (typeof imageUrl !== "string" || imageUrl.length === 0) {
      throw new Error("Image URL must be a non-empty string");
    }
    this.value.push(imageUrl);
  }

  removeImage(imageUrl: string): void {
    const index = this.value.indexOf(imageUrl);
    if (index === -1) {
      throw new Error("Image URL not found in the product images");
    }
    this.value.splice(index, 1);
  }
}
