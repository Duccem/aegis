import { inngest } from ".";
import { DomainEvent, EventBus } from "../../domain/domain-event";

export class InngestEventBus implements EventBus {
  async publish<T>(events: Array<DomainEvent<T>>): Promise<void> {
    const publishes = events.map((event) => ({ name: event.name, data: event.data }));
    await inngest.send(publishes);
  }
}
