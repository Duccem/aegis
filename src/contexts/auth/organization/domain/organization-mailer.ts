export interface OrganizationMailer {
  sendSubscriptionActivatedEmail(
    customerName: string,
    planName: string,
    startDate: string,
    renewalDate: string,
    billingUrl: string,
    email: string,
  ): Promise<void>;

  sendSubscriptionRevokedEmail(
    customerName: string,
    planName: string,
    reason: string,
    reactivateUrl: string,
    email: string,
  ): Promise<void>;
}
