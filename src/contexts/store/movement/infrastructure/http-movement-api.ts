import { Collection } from "@/contexts/shared/domain/collection";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { Movement } from "../domain/movement";

export class HttpMovementApi {
  static async list(params: {
    itemId?: string;
    originStoreId?: string;
    targetStoreId?: string;
    type?: string;
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
  }): Promise<Collection<Primitives<Movement>>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const response = await fetch(`/api/store/movement?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    return (await response.json()).data as Collection<Primitives<Movement>>;
  }

  static async transfer(
    originStoreId: string,
    targetStoreId: string,
    itemId: string,
    quantity: string,
  ): Promise<void> {
    const response = await fetch(`/api/store/movement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originStoreId,
        targetStoreId,
        itemId,
        quantity,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create transfer movement");
    }
  }
}
