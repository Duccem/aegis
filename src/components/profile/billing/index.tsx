"use client";

import { authClient } from "@/lib/auth/client";
import { useQuery } from "@tanstack/react-query";
import { ManageSubscription } from "./manage-subscription";
import { Usage, UsageSkeleton } from "./usage";

const BillingSection = () => {
  const { data: subscription, isFetching } = useQuery({
    initialData: {
      subscription: null,
      metrics: [],
    },
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data: subscription } = await authClient.customer.subscriptions.list({
        query: {
          page: 1,
          limit: 1,
          active: true,
        },
      });
      const { data: metrics } = await authClient.usage.meters.list({
        query: {
          limit: 100,
          page: 1,
        },
      });
      console.log(metrics);
      return {
        subscription: subscription?.result?.items?.[0] ?? null,
        metrics: metrics?.result?.items ?? [],
      };
    },
    refetchOnWindowFocus: false,
  });
  if (isFetching) {
    return <UsageSkeleton />;
  }
  return (
    <>
      <Usage meters={subscription.metrics} plan={"free"} />
      <ManageSubscription subscription={subscription.subscription} />
    </>
  );
};

export default BillingSection;
