import { v7, validate } from "uuid";
import { FormatError } from "../errors/format-error";
import { StringValueObject } from "../value-object";

export class Uuid extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
  public static random(): Uuid {
    return new Uuid(v7());
  }

  public static validateID(id: string): boolean {
    if (!validate(id)) return false;
    return true;
  }

  public static fromString(id: string): Uuid {
    return new Uuid(id);
  }

  protected validation(id: string): void {
    super.validation(id);
    if (!validate(id)) {
      throw new FormatError(`<${Uuid.name}> does not allow the value <${id}>`);
    }
  }

  public toString(): string {
    return this.value.toString();
  }
}
