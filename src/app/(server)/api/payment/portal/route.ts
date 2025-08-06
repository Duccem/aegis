import { getSession } from "@/lib/auth/server";
import { env } from "@/lib/env";
import { polar } from "@/lib/payments";
import { CustomerPortal } from "@polar-sh/nextjs";
import { NextRequest } from "next/server";

export const GET = CustomerPortal({
  accessToken: env.POLAR_ACCESS_TOKEN,
  getCustomerId: async (req: NextRequest) => {
    const session = await getSession();
    if (!session) {
      throw new Error("Not authenticated");
    }
    const customer = await polar.customers.getExternal({
      externalId: session.user.id,
    });
    return customer.id;
  },
  server: "sandbox",
});
