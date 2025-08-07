export type DomainEventPrimitives<T> = {
  id: string;
  occurred_on: Date;
  name: string;
  aggregate: string;
  data: T;
};
export abstract class DomainEvent<T> {
  static EVENT_NAME: string;
  static fromPrimitives: (params: any) => DomainEvent<any>;
  readonly id: string;
  readonly occurred_on: Date;
  readonly name: string;
  readonly data: T;
  readonly aggregate: string;

  constructor(eventId: string, occurred_on: Date, aggregate: string, name: string, data: T) {
    this.id = eventId;
    this.occurred_on = occurred_on;
    this.name = name;
    this.data = data;
    this.aggregate = aggregate;
  }

  public abstract toPrimitive(): DomainEventPrimitives<T>;
}
export interface EventBus {
  publish(events: Array<DomainEvent<any>>): Promise<void>;
}
