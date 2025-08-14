import { SendSubscriptionActivatedEmail } from "@/lib/core/organization/application/send-subscription-activated-email";
import { ResendOrganizationMailer } from "@/lib/core/organization/infrastructure/resend-organization-mailer";
import { verifyHeader } from "@/lib/emails/verify-header";
import { HttpNextResponse } from "@/lib/http/http-response";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  verifyHeader(req);
  const { customerName, planName, startDate, renewalDate, billingUrl, email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email and code are required" }, { status: 400 });
  }

  const service = new SendSubscriptionActivatedEmail(new ResendOrganizationMailer());
  await service.execute(customerName, planName, startDate, renewalDate, billingUrl, email);
  HttpNextResponse.noResponse(200);
};
