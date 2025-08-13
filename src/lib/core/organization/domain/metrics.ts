import { Primitives } from "@/lib/types/primitives";
import { NumberValueObject } from "@/lib/types/value-object";

export class Metrics {
  constructor(
    public organizationMembers: NumberValueObject,
    public aiCompletions: NumberValueObject,
    public productsCreated: NumberValueObject,
    public invoiceSent: NumberValueObject,
  ) {}

  toPrimitives() {
    return {
      organizationMembers: this.organizationMembers.value,
      aiCompletions: this.aiCompletions.value,
      productsCreated: this.productsCreated.value,
      invoiceSent: this.invoiceSent.value,
    };
  }

  static fromPrimitives(data: Primitives<Metrics>) {
    return new Metrics(
      new NumberValueObject(data.organizationMembers),
      new NumberValueObject(data.aiCompletions),
      new NumberValueObject(data.productsCreated),
      new NumberValueObject(data.invoiceSent),
    );
  }

  static empty() {
    return new Metrics(
      new NumberValueObject(0),
      new NumberValueObject(0),
      new NumberValueObject(0),
      new NumberValueObject(0),
    );
  }
}
