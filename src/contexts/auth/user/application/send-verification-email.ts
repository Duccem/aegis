import { UserMailer } from "../domain/user-mailer";

export class SendVerificationEmail {
  constructor(public readonly mailer: UserMailer) {}

  async execute(email: string, code: string): Promise<void> {
    await this.mailer.sendVerificationEmail(email, code);
  }
}
