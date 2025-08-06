import { emailOTPClient, organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, admin } from "./roles";
export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    organizationClient({
      ac,
      roles: {
        admin,
      },
    }),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;

