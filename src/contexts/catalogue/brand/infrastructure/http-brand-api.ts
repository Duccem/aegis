import { Primitives } from "@/contexts/shared/domain/primitives";
import { Brand } from "../domain/brand";

export class HttpBrandApi {
  static async save(name: string, id?: string): Promise<void> {
    const response = await fetch(`/api/catalogue/brand${id ? `/${id}` : ""}`, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to save brand");
    }
  }

  static async list(): Promise<Primitives<Brand>[]> {
    const response = await fetch("/api/catalogue/brand");
    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }
    return (await response.json()).data as Primitives<Brand>[];
  }
}
