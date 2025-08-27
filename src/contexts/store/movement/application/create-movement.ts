import { EventBus } from "@/contexts/shared/domain/domain-event";
import { Movement } from "../domain/movement";
import { MovementRepository } from "../domain/movement-repository";

export class CreateMovement {
  constructor(
    private readonly repository: MovementRepository,
    private readonly bus: EventBus,
  ) {}

  async execute(
    itemId: string,
    storeId: string,
    organizationId: string,
    type: string,
    quantity: number,
  ): Promise<void> {
    const movement = Movement.create(itemId, storeId, organizationId, type, quantity);
    await this.repository.save(movement);
    await this.bus.publish(movement.pullDomainEvents());
  }
}
