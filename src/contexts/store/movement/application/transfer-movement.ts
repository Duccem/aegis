import { EventBus } from "@/contexts/shared/domain/domain-event";
import { Movement } from "../domain/movement";
import { MovementRepository } from "../domain/movement-repository";

export class TransferMovement {
  constructor(
    private readonly repository: MovementRepository,
    private readonly bus: EventBus,
  ) {}

  async execute(
    itemId: string,
    fromStoreId: string,
    toStoreId: string,
    organizationId: string,
    quantity: number,
  ): Promise<void> {
    const movement = Movement.transfer(itemId, fromStoreId, toStoreId, organizationId, quantity);

    await this.repository.save(movement);
    await this.bus.publish(movement.pullDomainEvents());
  }
}
