import { checkout, polar, portal, usage, webhooks } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { bearer, emailOTP, openAPI, organization } from "better-auth/plugins";
import { headers } from "next/headers";
import { cache } from "react";
import { database } from "../database";
import * as schema from "../database/schema/_index";
import { env } from "../env";
import { client } from "../payments";
import { paymentProducts } from "../payments/products";
import {
  sendForgetPasswordEmail,
  sendSubscriptionActivatedEmail,
  sendSubscriptionRevokedEmail,
  sendVerificationEmail,
  updatePlan,
} from "./functions";
import { ac, admin } from "./roles";

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    schema,
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
    cookiePrefix: "aegis",
  },
  plugins: [
    nextCookies(),
    bearer(),
    openAPI(),
    organization({
      ac,
      roles: {
        admin,
      },
      schema: {
        organization: {
          additionalFields: {
            plan: {
              type: "string",
              defaultValue: "free",
            },
          },
        },
      },
    }),
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      allowedAttempts: 3,
      sendVerificationOnSignUp: true,
      sendVerificationOTP: async ({ email, otp, type }) => {
        switch (type) {
          case "email-verification":
            await sendVerificationEmail(email, otp);
            break;
          case "forget-password":
            await sendForgetPasswordEmail(email, otp);
            break;
          default:
            throw new Error(`Unsupported OTP type: ${type}`);
        }
      },
    }),
    polar({
      client,
      createCustomerOnSignUp: true,
      use: [
        usage(),
        portal(),
        checkout({
          allowDiscountCodes: true,
          authenticatedUsersOnly: true,
          successUrl: "/profile/billing",
          products: [
            {
              productId: paymentProducts.free,
              slug: "free",
            },
            {
              productId: paymentProducts.pro,
              slug: "pro",
            },
          ],
        }),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (payload) => {
            const plan = payload.data.productId === paymentProducts.pro ? "pro" : "free";
            await sendSubscriptionActivatedEmail({
              customerName: payload.data.customer.name ?? "",
              email: payload.data.customer.email,
              planName: plan,
              startDate: new Date(payload.data.createdAt).toLocaleDateString(),
              renewalDate: new Date(payload.data.subscription?.endedAt!).toLocaleDateString(),
              billingUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
            });
            await updatePlan(payload.data.metadata?.referenceId! as string, plan);
          },
          onSubscriptionRevoked: async (payload) => {
            await sendSubscriptionRevokedEmail({
              customerName: payload.data.customer.name ?? "",
              email: payload.data.customer.email,
              planName: payload.data.productId === paymentProducts.pro ? "Pro" : "Free  ",
              reason: payload.data.customerCancellationReason as string,
              reactivateUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
            });
            await updatePlan(payload.data.metadata?.referenceId! as string, "free");
          },
        }),
      ],
    }),
  ],
});

export type BetterSession = typeof auth.$Infer.Session;
export type BetterUser = typeof auth.$Infer.Session.user;
export type BetterOrganization = typeof auth.$Infer.Organization;
export type BetterMember = Omit<typeof auth.$Infer.Member, "role" | "user"> & { role: string };

export const getSession = cache(async (): Promise<BetterSession | null> => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

export const getOrganization = cache(async (): Promise<BetterOrganization | null> => {
  return await auth.api.getFullOrganization({
    headers: await headers(),
    query: {
      membersLimit: 0,
    },
  });
});
export const getMember = cache(async (): Promise<BetterMember | null> => {
  return await auth.api.getActiveMember({
    headers: await headers(),
  });
});

export const hasPermission = async (permissions: { [key: string]: string[] }): Promise<boolean> => {
  const { success, error } = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions,
    },
  });

  if (!success || error) {
    return false;
  }
  return true;
};
