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
    }),
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      allowedAttempts: 3,
      sendVerificationOnSignUp: true,
      sendVerificationOTP: async ({ email, otp, type }) => {
        console.log(`Sending ${type} OTP to ${email}: ${otp}`);
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
            const userId = payload.data.customer.externalId;
            const plan = payload.data.productId === paymentProducts.pro ? "pro" : "free";
            console.log(`User ${userId} has upgraded to ${plan} plan.`);
          },
          onSubscriptionRevoked: async (payload) => {
            const userId = payload.data.customer.externalId;
            console.log(`User ${userId} has revoked their subscription.`);
          },
          onCustomerCreated: async (payload) => {},
        }),
      ],
    }),
  ],
});

export type BetterSession = typeof auth.$Infer.Session;
export type BetterUser = typeof auth.$Infer.Session.user;
export type BetterOrganization = typeof auth.$Infer.Organization;

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});
