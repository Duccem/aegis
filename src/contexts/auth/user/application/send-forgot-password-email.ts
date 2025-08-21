import { UserMailer } from "../domain/user-mailer";

export class SendForgotPasswordEmail {
  constructor(public readonly mailer: UserMailer) {}

  async execute(email: string, code: string): Promise<void> {
    await this.mailer.sendForgetPasswordEmail(email, code);
  }
}
