import { Primitives } from "@/contexts/shared/domain/primitives";
import { Store } from "../domain/store";

export class HttpStoreApi {
  static async save(name: string, address: string, id?: string): Promise<void> {
    const response = await fetch(`/api/store/store${id ? `/${id}` : ""}`, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address }),
    });

    if (!response.ok) {
      throw new Error("Failed to save store");
    }
  }

  static async toggleStatus(id: string): Promise<void> {
    const response = await fetch(`/api/store/store/${id}/status`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("Failed to toggle store status");
    }
  }

  static async list(): Promise<Primitives<Store>[]> {
    const response = await fetch("/api/store/store", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch stores");
    }

    const data = await response.json();
    return data.data as Primitives<Store>[];
  }
}
