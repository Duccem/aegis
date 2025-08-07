import { DomainError } from "@/lib/types/domain-error";

export class ProductSKUExist extends DomainError {
  constructor(sku: string) {
    super(`Product with SKU "${sku}" already exists.`);
  }

  static withSku(sku: string): ProductSKUExist {
    return new ProductSKUExist(sku);
  }
}
