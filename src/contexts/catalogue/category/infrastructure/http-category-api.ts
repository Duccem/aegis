import { Primitives } from "@/contexts/shared/domain/primitives";
import { Category } from "../domain/category";

export class HttpCategoryApi {
  static async save(name: string, id?: string): Promise<void> {
    const response = await fetch(`/api/catalogue/category/${id ? id : ""}`, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error(`Failed to save category: ${response.statusText}`);
    }
  }

  static async list(): Promise<Primitives<Category>[]> {
    const response = await fetch("/api/catalogue/category");
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return (await response.json()).data as Primitives<Category>[];
  }
}
