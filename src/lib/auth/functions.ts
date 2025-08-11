import { resend } from "@/lib/emails";
import AegisForgetPassword from "@/lib/emails/templates/forget-password";
import AegisSubscriptionActivated from "@/lib/emails/templates/subscription-activated";
import AegisSubscriptionCancelled from "@/lib/emails/templates/subscription-cancelled";
import AegisVerifyEmail from "@/lib/emails/templates/verification-code";

export async function sendVerificationEmail(email: string, code: string): Promise<void> {
  await resend.emails.send({
    from: "Aegis <contacto@helsahealthcare.com>",
    to: [email],
    subject: "Hello world",
    react: AegisVerifyEmail({ verificationCode: code }),
  });
}

export async function sendForgetPasswordEmail(email: string, code: string): Promise<void> {
  await resend.emails.send({
    from: "Aegis <contacto@helsahealthcare.com>",
    to: [email],
    subject: "Hello world",
    react: AegisForgetPassword({ verificationCode: code }),
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
  await resend.emails.send({
    from: "Aegis <contacto@helsahealthcare.com>",
    to: [email],
    subject: "Tu suscripción de Aegis ha sido activada",
    react: AegisSubscriptionActivated({
      customerName,
      planName,
      startDate,
      renewalDate,
      billingUrl,
    }),
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
  await resend.emails.send({
    from: "Aegis <contacto@helsahealthcare.com>",
    to: [email],
    subject: "Tu suscripción de Aegis ha sido revocada",
    react: AegisSubscriptionCancelled({
      customerName,
      planName,
      reason,
      reactivateUrl,
      supportEmail: "contacto@aegis.com",
    }),
  });
}
