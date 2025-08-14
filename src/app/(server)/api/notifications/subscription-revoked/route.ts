import { SendSubscriptionRevokedEmail } from "@/lib/core/organization/application/send-subscription-revoked-email";
import { ResendOrganizationMailer } from "@/lib/core/organization/infrastructure/resend-organization-mailer";
import { verifyHeader } from "@/lib/emails/verify-header";
import { HttpNextResponse } from "@/lib/http/http-response";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  verifyHeader(req);
  const { customerName, planName, reason, reactivateUrl, email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email and code are required" }, { status: 400 });
  }

  const service = new SendSubscriptionRevokedEmail(new ResendOrganizationMailer());
  await service.execute(customerName, planName, reason, reactivateUrl, email);
  HttpNextResponse.noResponse(200);
};
