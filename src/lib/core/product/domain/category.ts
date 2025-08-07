import { Primitives } from "@/lib/types/primitives";
import { DateValueObject, StringValueObject } from "@/lib/types/value-object";
import { Uuid } from "@/lib/types/value-objects/uuid";

export class Category {
  constructor(
    public id: Uuid,
    public name: CategoryName,
    public createdAt: DateValueObject,
    public updatedAt: DateValueObject
  ) {}

  toPrimitives(): Primitives<Category> {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }
  static fromPrimitives(primitives: Primitives<Category>): Category {
    return new Category(
      new Uuid(primitives.id),
      new CategoryName(primitives.name),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt)
    );
  }

  static create(name: string, description: string): Category {
    return new Category(
      Uuid.random(),
      new CategoryName(name),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
}

class CategoryName extends StringValueObject {}
