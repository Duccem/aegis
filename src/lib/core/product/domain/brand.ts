import { Primitives } from "@/lib/types/primitives";
import { DateValueObject, StringValueObject } from "@/lib/types/value-object";
import { Uuid } from "@/lib/types/value-objects/uuid";

export class Brand {
  constructor(
    public id: Uuid,
    public name: BrandName,
    public createdAt: DateValueObject,
    public updatedAt: DateValueObject
  ) {}

  toPrimitives(): Primitives<Brand> {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  static fromPrimitives(primitives: Primitives<Brand>): Brand {
    return new Brand(
      new Uuid(primitives.id),
      new BrandName(primitives.name),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt)
    );
  }

  static create(name: string): Brand {
    return new Brand(
      Uuid.random(),
      new BrandName(name),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
}

class BrandName extends StringValueObject {}
