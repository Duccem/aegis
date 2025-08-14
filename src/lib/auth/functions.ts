import { env } from "../env";

export async function sendVerificationEmail(email: string, code: string): Promise<void> {
  await fetch("/api/notifications/verification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-notifications-key": env.NOTIFICATIONS_API_KEY || "",
    },
    body: JSON.stringify({ email, code }),
  });
}

export async function sendForgetPasswordEmail(email: string, code: string): Promise<void> {
  await fetch("/api/notifications/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-notifications-key": env.NOTIFICATIONS_API_KEY || "",
    },
    body: JSON.stringify({ email, code }),
  });
}

export async function sendSubscriptionActivatedEmail({
  customerName,
  planName,
  startDate,
  renewalDate,
  billingUrl,
  email,
}: {
  customerName?: string;
  planName?: string;
  startDate?: string;
  renewalDate?: string;
  billingUrl?: string;
  email: string;
}): Promise<void> {
  await fetch("/api/notifications/subscription-activated", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-notifications-key": env.NOTIFICATIONS_API_KEY || "",
    },
    body: JSON.stringify({ customerName, planName, startDate, renewalDate, billingUrl, email }),
  });
}

export async function sendSubscriptionRevokedEmail({
  customerName,
  planName,
  reason,
  reactivateUrl,
  email,
}: {
  customerName?: string;
  planName?: string;
  reason?: string;
  reactivateUrl?: string;
  email: string;
}): Promise<void> {
  await fetch("/api/notifications/subscription-revoked", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-notifications-key": env.NOTIFICATIONS_API_KEY || "",
    },
    body: JSON.stringify({ customerName, planName, reason, reactivateUrl, email }),
  });
}
