export class HttpProductApi {
  static async createProduct(productData: {
    name: string;
    description: string;
    price: number;
    cost: number;
    sku: string;
    images: string[];
    unitId: string;
    brandId: string;
    categories: string[];
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
}
