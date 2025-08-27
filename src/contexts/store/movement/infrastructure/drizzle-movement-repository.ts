import { Criteria } from "@/contexts/shared/domain/criteria";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { database } from "@/contexts/shared/infrastructure/database";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/database/converter";
import { stock_movement } from "@/contexts/shared/infrastructure/database/schema";
import { count } from "drizzle-orm";
import { Movement } from "../domain/movement";
import { MovementRepository } from "../domain/movement-repository";

export class DrizzleMovementRepository implements MovementRepository {
  private converter = new DrizzleCriteriaConverter(stock_movement);

  async save(data: Movement): Promise<void> {
    const primitives = data.toPrimitives();
    await database.insert(stock_movement).values(primitives);
  }

  async search(criteria: Criteria): Promise<Movement[]> {
    const { where, orderBy, limit, offset } = this.converter.criteria(criteria);

    const results = await database
      .select()
      .from(stock_movement)
      .where(where)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    return results.map((result) => Movement.fromPrimitives(result as Primitives<Movement>));
  }

  async count(criteria: Criteria): Promise<number> {
    const { where } = this.converter.criteria(criteria);
    const result = await database
      .select({ count: count(stock_movement.id) })
      .from(stock_movement)
      .where(where);
    return result[0].count;
  }
}
