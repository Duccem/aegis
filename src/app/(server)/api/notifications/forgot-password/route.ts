import { SendForgotPasswordEmail } from "@/lib/core/user/application/send-forgot-password-email";
import { ResendUserMailer } from "@/lib/core/user/infrastructure/resend-user-mailer";
import { verifyHeader } from "@/lib/emails/verify-header";
import { HttpNextResponse } from "@/lib/http/http-response";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  verifyHeader(req);
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ message: "Email and code are required" }, { status: 400 });
  }

  const service = new SendForgotPasswordEmail(new ResendUserMailer());
  await service.execute(email, code);
  HttpNextResponse.noResponse(200);
};
