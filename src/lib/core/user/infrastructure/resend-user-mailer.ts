import { resend } from "@/lib/emails";
import AegisForgetPassword from "@/lib/emails/templates/forget-password";
import AegisVerifyEmail from "@/lib/emails/templates/verification-code";

export class ResendUserMailer {
  async sendVerificationEmail(email: string, code: string): Promise<void> {
    await resend.emails.send({
      from: "Aegis <contacto@helsahealthcare.com>",
      to: [email],
      subject: "Hello world",
      react: AegisVerifyEmail({ verificationCode: code }),
    });
  }

  async sendForgetPasswordEmail(email: string, code: string): Promise<void> {
    await resend.emails.send({
      from: "Aegis <contacto@helsahealthcare.com>",
      to: [email],
      subject: "Hello world",
      react: AegisForgetPassword({ verificationCode: code }),
    });
  }
}
