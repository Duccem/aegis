import { DomainError } from "@/lib/types/domain-error";

export class ItemSKUExist extends DomainError {
  constructor(sku: string) {
    super(`Item with SKU "${sku}" already exists.`);
  }

  static withSku(sku: string): ItemSKUExist {
    return new ItemSKUExist(sku);
  }
}
