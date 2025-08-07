import { Primitives } from "@/lib/types/primitives";
import { StringValueObject, BooleanValueObject } from "@/lib/types/value-object";
import { Uuid } from "@/lib/types/value-objects/uuid";

export class Unit {
  constructor(
    public readonly id: Uuid,
    public readonly name: StringValueObject,
    public readonly abbreviation: StringValueObject,
    public readonly divisible: BooleanValueObject
  ) {}

  toPrimitives(): Primitives<Unit> {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      abbreviation: this.abbreviation.getValue(),
      divisible: this.divisible.getValue(),
    };
  }

  static fromPrimitives(primitives: Primitives<Unit>): Unit {
    return new Unit(
      new Uuid(primitives.id),
      new StringValueObject(primitives.name),
      new StringValueObject(primitives.abbreviation),
      new BooleanValueObject(primitives.divisible)
    );
  }
}
