import { OrganizationMailer } from "../domain/organization-mailer";

export class SendSubscriptionRevokedEmail {
  constructor(private readonly mailer: OrganizationMailer) {}

  async execute(
    customerName: string,
    planName: string,
    reason: string,
    reactivateUrl: string,
    email: string,
  ): Promise<void> {
    await this.mailer.sendSubscriptionRevokedEmail(
      customerName,
      planName,
      reason,
      reactivateUrl,
      email,
    );
  }
}
