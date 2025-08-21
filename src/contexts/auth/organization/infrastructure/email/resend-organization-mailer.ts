import { resend } from "@/contexts/shared/infrastructure/emails";
import { OrganizationMailer } from "../../domain/organization-mailer";
import AegisSubscriptionActivated from "./subscription-activated";
import AegisSubscriptionCancelled from "./subscription-cancelled";

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
