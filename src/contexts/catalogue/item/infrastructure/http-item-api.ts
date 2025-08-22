import { Meta } from "@/contexts/shared/domain/collection";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { Item } from "../domain/item";
import { Unit } from "../domain/unit";

export class HttpItemApi {
  static async create(item: {
    name: string;
    description: string;
    sku: string;
    images: string[];
    unitId: string;
    brandId: string;
    categories: string[];
    type: "product" | "service";
  }) {
    const response = await fetch("/api/catalogue/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to create item");
    }
  }

  static async search(params: {
    query?: string;
    brandId?: string;
    minPrice?: number;
    maxPrice?: number;
    minCost?: number;
    maxCost?: number;
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
  }): Promise<{ items: Primitives<Item>[]; meta: Meta }> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    const response = await fetch(`/api/catalogue/item?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    return (await response.json()).data;
  }

  static async update(
    itemId: string,
    itemData: {
      name: string;
      sku: string;
      description: string;
      brandId: string;
      unitId: string;
      categories: string[];
    },
  ) {
    const response = await fetch(`/api/catalogue/item/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      throw new Error("Failed to update item");
    }
  }

  static async toggleStatus(itemId: string) {
    const response = await fetch(`/api/catalogue/item/${itemId}/status`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Failed to toggle item status");
    }
  }

  static async archive(itemId: string) {
    const response = await fetch(`/api/catalogue/item/${itemId}/archive`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Failed to archive product");
    }
  }

  static async getItemsMetrics(): Promise<{
    totalProducts: number;
    totalProductsThisMonth: number;
    totalActiveProducts: number;
  }> {
    const response = await fetch("/api/catalogue/item/metrics");
    if (!response.ok) {
      throw new Error("Failed to fetch item metrics");
    }
    return (await response.json()).data;
  }

  static async addImage(itemId: string, imageUrl: string) {
    const response = await fetch(`/api/catalogue/item/${itemId}/image`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: imageUrl }),
    });
    if (!response.ok) {
      throw new Error("Failed to add item image");
    }
  }

  static async removeImage(itemId: string, imageUrl: string) {
    const response = await fetch(`/api/catalogue/item/${itemId}/image`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: imageUrl }),
    });
    if (!response.ok) {
      throw new Error("Failed to remove product image");
    }
  }

  static async units() {
    const response = await fetch("/api/catalogue/item/unit");
    if (!response.ok) {
      throw new Error("Failed to fetch units");
    }
    return (await response.json()).data as Primitives<Unit>[];
  }
}
