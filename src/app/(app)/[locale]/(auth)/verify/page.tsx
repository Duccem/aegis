import GoToHome from "@/components/auth/go-to-home";
import ResendCode from "@/components/auth/resend-code";
import VerifyForm from "@/components/auth/verify-form";

const Page = () => {
  return (
    <div className="flex  justify-center items-center h-full">
      <div className="flex flex-col items-start justify-center w-full md:w-2/3 p-10 md:p-0 h-full gap-4">
        <GoToHome />
        <h1 className="text-5xl">Verification</h1>
        <p className=" text-muted-foreground">
          Please enter the verification code sent to your email to continue your registration
          process.
        </p>
        <VerifyForm />
        <div>
          <ResendCode />
        </div>
      </div>
    </div>
  );
};

export default Page;
