import { Primitives } from "@/contexts/shared/domain/primitives";
import { Stock } from "../domain/stock";

export class HttpStockApi {
  static async list(params: {
    itemId?: string;
    storeId?: string;
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
  }): Promise<Primitives<Stock>[]> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const response = await fetch(`/api/store/stock?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch stocks");
    }
    const data = (await response.json()).data as Primitives<Stock>[];
    return data;
  }

  static async complements(): Promise<{
    items: { id: string; name: string }[];
    stores: { id: string; name: string }[];
  }> {
    const response = await fetch(`/api/store/stock/complements`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch stock complements");
    }
    const data = (await response.json()).data as {
      items: { id: string; name: string }[];
      stores: { id: string; name: string }[];
    };
    return data;
  }
}
