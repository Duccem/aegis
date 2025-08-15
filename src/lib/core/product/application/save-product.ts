import { Criteria, Operator } from "@/lib/types/criteria";
import { Product } from "../domain/product";
import { ProductSKUExist } from "../domain/product-sku-exist-error";
import { ProductRepository } from "../domain/product.repository";

export type CreateProductData = {
  name: string;
  sku: string;
  description: string;
  cost: number;
  price: number;
  images: string[];
  unitId: string;
  brandId: string;
  categories?: string[];
  organizationId: string;
};

export class CreateProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(data: CreateProductData): Promise<void> {
    const existingProduct = await this.repository.find(
      Criteria.withFilters([{ field: "sku", operator: Operator.EQUAL, value: data.sku }]),
    );

    if (existingProduct) {
      throw ProductSKUExist.withSku(data.sku);
    }

    const product = Product.create(
      data.name,
      data.sku,
      data.description,
      data.cost,
      data.price,
      data.images,
      data.unitId,
      data.brandId,
      data.categories,
      data.organizationId,
    );

    await this.repository.save(product);
  }
}
