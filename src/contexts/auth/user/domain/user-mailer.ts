export interface UserMailer {
  sendVerificationEmail(email: string, code: string): Promise<void>;
  sendForgetPasswordEmail(email: string, code: string): Promise<void>;
}
