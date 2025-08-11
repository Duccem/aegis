import { sendSubscriptionRevokedEmail } from "@/lib/auth/functions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ message: "Email and code are required" }, { status: 400 });
  }

  // const sender = new ResendUserMailer();

  // await sender.sendVerificationEmail(email, code);

  await sendSubscriptionRevokedEmail({
    email,
    customerName: "Alex",
    planName: "Pro",
    reason: "Pago no recibido",
    reactivateUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
  });

  return NextResponse.json({ message: "Verification email sent successfully" }, { status: 200 });
};
