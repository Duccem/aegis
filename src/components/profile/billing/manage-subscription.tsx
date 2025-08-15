"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth/client";
import { paymentProducts } from "@/lib/payments/products";
import Prices from "./prices";

const plans = {
  free: {
    name: "Free Plan",
    product: paymentProducts.free,
  },
  pro: {
    name: "Pro Plan",
    product: paymentProducts.pro,
  },
} as const;

export function ManageSubscription({ plan }: { plan: string }) {
  const isFree = plan === "free";
  const subscription = plans[plan as keyof typeof plans] || plans.free;

  return (
    <div>
      <h2 className="text-lg font-medium leading-none tracking-tight mb-4">Subscription</h2>
      <Card className="flex justify-between p-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">
            {!isFree
              ? `You are currently subscribed to the ${subscription?.name ?? ""} plan.`
              : "You are currently on the free plan."}
          </p>
          <p className="text-lg font-medium">
            {!isFree ? (subscription?.name ?? "") : "Free Plan"}
          </p>
        </div>

        <div className="mt-auto">
          {!isFree ? (
            <Button
              variant="secondary"
              className="h-9 hover:bg-primary hover:text-secondary"
              onClick={async () => {
                await authClient.customer.portal();
              }}
            >
              Manage Subscription
            </Button>
          ) : (
            <Prices />
          )}
        </div>
      </Card>
    </div>
  );
}
