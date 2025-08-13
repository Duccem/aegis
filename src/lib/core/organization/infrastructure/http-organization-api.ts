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
}
