import { Aggregate } from "@/lib/types/aggregate";
import { Primitives } from "@/lib/types/primitives";
import { DateValueObject, StringValueObject } from "@/lib/types/value-object";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { Brand } from "./brand";
import { Category } from "./category";
import { ItemType } from "./item-type";
import { ProductCreated } from "./product-created-event";
import { ProductImages } from "./product-images";
import { ProductSKU } from "./product-sku";
import { ProductStatus } from "./product-status";
import { Unit } from "./unit";

export class Product extends Aggregate {
  constructor(
    id: ProductID,
    public name: ProductName,
    public sku: ProductSKU,
    public description: ProductDescription,
    public images: ProductImages,
    public status: ProductStatus,
    public type: ItemType,
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
      images: this.images.getValue(),
      status: this.status.getValue(),
      type: this.type.getValue(),
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
      new ProductImages(primitives.images),
      ProductStatus.fromString(primitives.status),
      ItemType.fromString(primitives.type),
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
    images: Array<string>,
    unitId: string,
    brandId: string,
    categoriesIds: string[] = [],
    organizationId: string,
    type: "product" | "service",
  ): Product {
    const product = new Product(
      ProductID.random(),
      new ProductName(name),
      new ProductSKU(sku),
      new ProductDescription(description),
      new ProductImages(images),
      ProductStatus.active(),
      ItemType.fromString(type),
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

  update(
    name: string,
    sku: string,
    description: string,
    unitId: string,
    brandId: string,
    categoriesIds: string[],
  ) {
    this.name = new ProductName(name);
    this.sku = new ProductSKU(sku);
    this.description = new ProductDescription(description);
    this.unit = Unit.fromPrimitives({
      id: unitId,
      name: "Updated Product Unit",
      abbreviation: "PU",
      divisible: true,
    });
    this.brand = Brand.fromPrimitives({
      id: brandId,
      name: "Updated Product Brand",
      organizationId: this.organizationId.value,
      createdAt: DateValueObject.today().value,
      updatedAt: DateValueObject.today().value,
    });
    this.categories = categoriesIds.map((id) =>
      Category.fromPrimitives({
        id,
        name: "Updated Category",
        organizationId: this.organizationId.value,
        createdAt: DateValueObject.today().value,
        updatedAt: DateValueObject.today().value,
      }),
    );
    this.updatedAt = DateValueObject.today();
  }

  toggleStatus() {
    if (this.status.isActive()) {
      this.status = ProductStatus.inactive();
    } else {
      this.status = ProductStatus.active();
    }
  }

  archive() {
    this.status = ProductStatus.archived();
  }

  addImage(imageUrl: string) {
    this.images.addImage(imageUrl);
    this.updatedAt = DateValueObject.today();
  }

  removeImage(imageUrl: string) {
    this.images.removeImage(imageUrl);
    this.updatedAt = DateValueObject.today();
  }
}
export class ProductID extends Uuid {}
export class ProductName extends StringValueObject {}
export class ProductDescription extends StringValueObject {}
