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
}
