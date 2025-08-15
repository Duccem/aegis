"use client";

import { HttpOrganizationApi } from "@/lib/core/organization/infrastructure/http-organization-api";
import { useQuery } from "@tanstack/react-query";
import { ManageSubscription } from "./manage-subscription";
import Orders from "./orders";
import { Usage, UsageSkeleton } from "./usage";

const BillingSection = () => {
  const { data: organization, isFetching } = useQuery({
    initialData: {
      metrics: {
        organizationMembers: 0,
        aiCompletions: 0,
        productsCreated: 0,
        invoiceSent: 0,
      },
      plan: "free",
      id: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      logo: null,
      metadata: null,
      name: "",
      slug: "",
    },
    queryKey: ["subscription"],
    queryFn: async () => {
      return await HttpOrganizationApi.getOrganization();
    },
    refetchOnWindowFocus: false,
  });
  if (isFetching) {
    return <UsageSkeleton />;
  }
  return (
    <>
      <ManageSubscription plan={organization.plan} />
      <Usage meters={organization.metrics} plan={organization.plan} />
      {organization.plan !== "free" && <Orders />}
    </>
  );
};

export default BillingSection;
