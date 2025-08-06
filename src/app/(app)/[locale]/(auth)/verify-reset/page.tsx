import GoToHome from "@/components/auth/go-to-home";
import ResendCode from "@/components/auth/resend-code";
import VerifyResetForm from "@/components/auth/verify-reset-form";

const Page = () => {
  return (
    <div className="flex  justify-center items-center h-full">
      <div className="flex flex-col items-start justify-center w-full md:w-2/3 p-10 md:p-0 h-full gap-4">
        <GoToHome />
        <h1 className="text-5xl">Reset your password</h1>
        <p className=" text-muted-foreground">
          Please enter the code sent to your email and set a new password. If you haven't received
          the code, you can resend it.
        </p>
        <VerifyResetForm />
        <div>
          <ResendCode type="forget-password" />
        </div>
      </div>
    </div>
  );
};

export default Page;
