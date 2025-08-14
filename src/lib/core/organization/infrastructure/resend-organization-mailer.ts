import { resend } from "@/lib/emails";
import AegisSubscriptionActivated from "@/lib/emails/templates/subscription-activated";
import { OrganizationMailer } from "../domain/organization-mailer";
import AegisSubscriptionCancelled from "@/lib/emails/templates/subscription-cancelled";

export class ResendOrganizationMailer implements OrganizationMailer {
  async sendSubscriptionActivatedEmail(
    customerName: string,
    planName: string,
    startDate: string,
    renewalDate: string,
    billingUrl: string,
    email: string,
  ): Promise<void> {
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
  async sendSubscriptionRevokedEmail(
    customerName: string,
    planName: string,
    reason: string,
    reactivateUrl: string,
    email: string,
  ): Promise<void> {
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
}
