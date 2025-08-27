"use client";

import { BetterOrganization, BetterUser } from "@/contexts/shared/infrastructure/auth/server";
import { createContext, useContext } from "react";

const SessionContext = createContext<
  | { user: BetterUser; organization?: BetterOrganization; organizations?: BetterOrganization[] }
  | undefined
>(undefined);

export const SessionProvider = ({
  children,
  user,
  organization,
  organizations,
}: {
  children: React.ReactNode;
  user: BetterUser;
  organization?: BetterOrganization;
  organizations?: BetterOrganization[];
}) => {
  return (
    <SessionContext.Provider value={{ user, organization, organizations }}>
      {children}
    </SessionContext.Provider>
  );
};
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return {
    user: context.user,
    organization: context.organization,
    organizations: context.organizations,
  };
};
