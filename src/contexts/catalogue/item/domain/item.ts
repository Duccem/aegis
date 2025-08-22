import { Aggregate } from "@/contexts/shared/domain/aggregate";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { DateValueObject, StringValueObject } from "@/contexts/shared/domain/value-object";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { ItemImages } from "./item-images";
import { ItemName } from "./item-name";
import { ItemStatus } from "./item-status";
import { ItemType } from "./item-type";

export class Item extends Aggregate {
  constructor(
    id: ItemID,
    public name: ItemName,
    public sku: ItemSKU,
    public description: ItemDescription,
    public images: ItemImages,
    public status: ItemStatus,
    public type: ItemType,
    public organizationId: Uuid,
    public categoriesIds: Uuid[],
    public unitId: Uuid,
    public brandId: Uuid,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Item> {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      sku: this.sku.getValue(),
      description: this.description.getValue(),
      images: this.images.getValue(),
      status: this.status.getValue(),
      type: this.type.getValue(),
      organizationId: this.organizationId.getValue(),
      categoriesIds: this.categoriesIds.map((categoryId) => categoryId.getValue()),
      unitId: this.unitId.getValue(),
      brandId: this.brandId.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  static fromPrimitives(primitives: Primitives<Item>): Item {
    return new Item(
      new ItemID(primitives.id),
      new ItemName(primitives.name),
      new ItemSKU(primitives.sku),
      new ItemDescription(primitives.description),
      new ItemImages(primitives.images),
      ItemStatus.fromString(primitives.status),
      ItemType.fromString(primitives.type),
      new Uuid(primitives.organizationId),
      primitives.categoriesIds.map((id) => new Uuid(id)),
      new Uuid(primitives.unitId),
      new Uuid(primitives.brandId),
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
    categoriesIds: string[],
    organizationId: string,
    type: "product" | "service",
  ) {
    return new Item(
      ItemID.random(),
      new ItemName(name),
      new ItemSKU(sku),
      new ItemDescription(description),
      new ItemImages(images),
      ItemStatus.active(),
      ItemType.fromString(type),
      new Uuid(organizationId),
      categoriesIds.map((id) => new Uuid(id)),
      new Uuid(unitId),
      new Uuid(brandId),
      DateValueObject.today(),
      DateValueObject.today(),
    );
  }

  update(
    name: string,
    sku: string,
    description: string,
    unitId: string,
    brandId: string,
    categoriesIds: string[],
  ) {
    this.name = new ItemName(name);
    this.sku = new ItemSKU(sku);
    this.description = new ItemDescription(description);
    this.unitId = new Uuid(unitId);
    this.brandId = new Uuid(brandId);
    this.categoriesIds = categoriesIds.map((id) => new Uuid(id));
  }

  toggleStatus() {
    this.status = this.status.isActive() ? ItemStatus.inactive() : ItemStatus.active();
  }

  archive() {
    this.status = ItemStatus.archived();
  }

  addImage(image: string) {
    this.images.addImage(image);
  }

  removeImage(image: string) {
    this.images.removeImage(image);
  }
}

export class ItemID extends Uuid {}
export class ItemSKU extends StringValueObject {}

export class ItemDescription extends StringValueObject {}
