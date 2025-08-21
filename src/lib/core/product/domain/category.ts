import { Primitives } from "@/lib/types/primitives";
import { DateValueObject, StringValueObject } from "@/lib/types/value-object";
import { Uuid } from "@/lib/types/value-objects/uuid";

export class Category {
  constructor(
    public id: Uuid,
    public name: CategoryName,
    public organizationId: Uuid,
    public createdAt: DateValueObject,
    public updatedAt: DateValueObject,
  ) {}

  toPrimitives(): Primitives<Category> {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      organizationId: this.organizationId.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }
  static fromPrimitives(primitives: Primitives<Category>): Category {
    return new Category(
      new Uuid(primitives.id),
      new CategoryName(primitives.name),
      new Uuid(primitives.organizationId),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt),
    );
  }

  static create(name: string, organizationId: string): Category {
    return new Category(
      Uuid.random(),
      new CategoryName(name),
      new Uuid(organizationId),
      DateValueObject.today(),
      DateValueObject.today(),
    );
  }

  updateName(name: string): void {
    this.name = new CategoryName(name);
    this.updatedAt = DateValueObject.today();
  }
}

class CategoryName extends StringValueObject {}
