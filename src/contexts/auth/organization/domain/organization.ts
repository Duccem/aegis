import { Aggregate } from "@/contexts/shared/domain/aggregate";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { DateValueObject, StringValueObject } from "@/contexts/shared/domain/value-object";
import { Uuid } from "@/contexts/shared/domain/value-objects/uuid";
import { Metrics } from "./metrics";

export class Organization extends Aggregate {
  constructor(
    id: Uuid,
    public name: StringValueObject,
    public slug: StringValueObject,
    public logo: StringValueObject | null,
    public metadata: StringValueObject | null,
    public plan: StringValueObject,
    public metrics: Metrics,
    createdAt: DateValueObject,
  ) {
    super(id, createdAt, createdAt);
  }

  toPrimitives(): Primitives<Organization> {
    return {
      id: this.id.value,
      name: this.name.value,
      slug: this.slug.value,
      logo: this.logo?.value ?? null,
      metadata: this.metadata?.value ?? null,
      plan: this.plan.value,
      metrics: this.metrics.toPrimitives(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(data: Primitives<Organization>) {
    return new Organization(
      new Uuid(data.id),
      new StringValueObject(data.name),
      new StringValueObject(data.slug),
      data.logo ? new StringValueObject(data.logo) : null,
      data.metadata ? new StringValueObject(data.metadata) : null,
      new StringValueObject(data.plan),
      Metrics.fromPrimitives(data.metrics),
      new DateValueObject(data.createdAt),
    );
  }

  updateMetrics(metrics: Primitives<Metrics>): void {
    this.metrics = Metrics.fromPrimitives(metrics);
    this.updatedAt = new DateValueObject(new Date());
  }
}
