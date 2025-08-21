import { resend } from "@/contexts/shared/infrastructure/emails";
import AegisForgetPassword from "./email-templates/forget-password";
import AegisVerifyEmail from "./email-templates/verification-code";

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
