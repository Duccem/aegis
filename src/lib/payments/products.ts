import { env } from "../env";

export const paymentProducts = {
  pro: env.NEXT_PUBLIC_POLAR_PRODUCT_PRO || "3544a723-1a1d-4a15-82cf-90d1b3fe482f",
  free: env.NEXT_PUBLIC_POLAR_PRODUCT_FREE || "cd4b901c-fd2a-4567-8fb2-8ef02ad82222",
};
