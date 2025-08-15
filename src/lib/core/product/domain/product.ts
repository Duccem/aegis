import { Aggregate } from "@/lib/types/aggregate";
import { Primitives } from "@/lib/types/primitives";
import { DateValueObject, StringValueObject } from "@/lib/types/value-object";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { Brand } from "./brand";
import { Category } from "./category";
import { ProductCreated } from "./product-created-event";
import { ProductImages } from "./product-images";
import { ProductCost, ProductPrice } from "./product-price";
import { ProductSKU } from "./product-sku";
import { Unit } from "./unit";

export class Product extends Aggregate {
  constructor(
    id: ProductID,
    public name: ProductName,
    public sku: ProductSKU,
    public description: ProductDescription,
    public cost: ProductCost,
    public price: ProductPrice,
    public images: ProductImages,
    public categories: Category[],
    public unit: Unit | undefined,
    public brand: Brand | undefined,
    public organizationId: Uuid,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Product> {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      sku: this.sku.getValue(),
      description: this.description.getValue(),
      cost: this.cost.getValue(),
      price: this.price.getValue(),
      images: this.images.getValue(),
      categories: this.categories.map((category) => category.toPrimitives()),
      unit: this.unit ? this.unit.toPrimitives() : undefined,
      brand: this.brand ? this.brand.toPrimitives() : undefined,
      organizationId: this.organizationId.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  static fromPrimitives(primitives: Primitives<Product>): Product {
    return new Product(
      new ProductID(primitives.id),
      new ProductName(primitives.name),
      new ProductSKU(primitives.sku),
      new ProductDescription(primitives.description),
      new ProductCost(primitives.cost),
      new ProductPrice(primitives.price),
      new ProductImages(primitives.images),
      primitives.categories.map((category) => Category.fromPrimitives(category)),
      primitives.unit ? Unit.fromPrimitives(primitives.unit) : undefined,
      primitives.brand ? Brand.fromPrimitives(primitives.brand) : undefined,
      new Uuid(primitives.organizationId),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt),
    );
  }

  static create(
    name: string,
    sku: string,
    description: string,
    cost: number,
    price: number,
    images: Array<string>,
    unitId: string,
    brandId: string,
    categoriesIds: string[] = [],
    organizationId: string,
  ): Product {
    const product = new Product(
      ProductID.random(),
      new ProductName(name),
      new ProductSKU(sku),
      new ProductDescription(description),
      new ProductCost(cost),
      new ProductPrice(price),
      new ProductImages(images),
      categoriesIds.map((id) =>
        Category.fromPrimitives({
          id,
          name: "Default Category",
          organizationId,
          createdAt: DateValueObject.today().value,
          updatedAt: DateValueObject.today().value,
        }),
      ),
      Unit.fromPrimitives({
        id: unitId,
        name: "New Product Unit",
        abbreviation: "PU",
        divisible: true,
      }),
      Brand.fromPrimitives({
        id: brandId,
        name: "New Product Brand",
        organizationId,
        createdAt: DateValueObject.today().value,
        updatedAt: DateValueObject.today().value,
      }),
      new Uuid(organizationId),
      DateValueObject.today(),
      DateValueObject.today(),
    );
    product.record(ProductCreated.dispatch(product.id.value, product.name.value));
    return product;
  }
}
export class ProductID extends Uuid {}
export class ProductName extends StringValueObject {}
export class ProductDescription extends StringValueObject {}
