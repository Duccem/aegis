import { OrganizationMailer } from "../domain/organization-mailer";

export class SendSubscriptionActivatedEmail {
  constructor(private readonly mailer: OrganizationMailer) {}

  async execute(
    customerName: string,
    planName: string,
    startDate: string,
    renewalDate: string,
    billingUrl: string,
    email: string,
  ): Promise<void> {
    await this.mailer.sendSubscriptionActivatedEmail(
      customerName,
      planName,
      startDate,
      renewalDate,
      billingUrl,
      email,
    );
  }
}
