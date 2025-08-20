import { Meta } from "@/lib/types/collection";
import { Primitives } from "@/lib/types/primitives";
import { Product } from "../domain/product";

export class HttpProductApi {
  static async createProduct(productData: {
    name: string;
    description: string;
    sku: string;
    images: string[];
    unitId: string;
    brandId: string;
    categories: string[];
    type: "product" | "service";
  }) {
    const response = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
  }

  static async getProducts(params: {
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
  }): Promise<{ items: Primitives<Product>[]; meta: Meta }> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    const response = await fetch(`/api/product?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return (await response.json()).data;
  }

  static async updateProduct(
    productId: string,
    productData: {
      name: string;
      sku: string;
      description: string;
      brandId: string;
      unitId: string;
      categories: string[];
    },
  ) {
    const response = await fetch(`/api/product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
  }

  static async toggleProductStatus(productId: string) {
    const response = await fetch(`/api/product/${productId}/status`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Failed to toggle product status");
    }
  }

  static async archiveProduct(productId: string) {
    const response = await fetch(`/api/product/${productId}/archive`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Failed to archive product");
    }
  }

  static async getProductMetrics(): Promise<{
    totalProducts: number;
    totalProductsThisMonth: number;
    totalActiveProducts: number;
  }> {
    const response = await fetch("/api/product/metrics");
    if (!response.ok) {
      throw new Error("Failed to fetch product metrics");
    }
    return (await response.json()).data;
  }
}
