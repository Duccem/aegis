import { authClient } from "@/lib/auth/client";
import { Primitives } from "@/lib/types/primitives";
import { Organization } from "../domain/organization";

export class HttpOrganizationApi {
  static async initializeMetrics(id: string): Promise<void> {
    const response = await fetch(`/api/organization/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        organizationMembers: 0,
        aiCompletions: 0,
        productsCreated: 0,
        invoiceSent: 0,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to initialize organization metrics");
    }
  }

  static async getOrganization(): Promise<Primitives<Organization>> {
    const response = await fetch("/api/organization");
    if (!response.ok) {
      throw new Error("Failed to fetch organization data");
    }
    const data = await response.json();
    return data.data as Primitives<Organization>;
  }

  static async getOrders({ input }: { input: { cursor?: number; pageSize: number } }) {
    const { data } = await authClient.customer.orders.list({
      query: {
        page: input.cursor ? Number(input.cursor) : 1,
        limit: input.pageSize,
      },
    });
    const orders = data?.result.items!;
    const pagination = data?.result.pagination!;

    const ordersWithMetadata = {
      data: orders?.map((order) => ({
        id: order.id,
        createdAt: order.createdAt,
        amount: {
          amount: order.totalAmount,
          currency: order.currency,
        },
        status: order.status,
        product: {
          name: order.product.name,
        },
        invoiceId: order.isInvoiceGenerated ? order.id : null,
      })),
      meta: {
        hasNextPage: (input.cursor ? Number(input.cursor) : 1) < (pagination?.maxPage ?? 10),
        cursor:
          (input.cursor ? Number(input.cursor) : 1) < (pagination?.maxPage ?? 10)
            ? (input.cursor ? Number(input.cursor) : 1) + 1
            : undefined,
      },
    };
    return ordersWithMetadata;
  }
}
