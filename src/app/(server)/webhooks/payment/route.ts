import { env } from "@/lib/env";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: env.POLAR_WEBHOOK_SECRET,
  onPayload: async (payload) => {
    // Handle the payload from the webhook
    console.log("Received webhook payload:", payload);
    // You can add your logic here to process the payload
  },
});
