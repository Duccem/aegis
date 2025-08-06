import ForgetPasswordForm from "@/components/auth/forget-password-form";
import GoToHome from "@/components/auth/go-to-home";

const Page = () => {
  return (
    <div className="flex  justify-center items-center h-full">
      <div className="flex flex-col items-start justify-center w-full md:w-2/3 p-10 md:p-0 h-full gap-4">
        <GoToHome />
        <h1 className="text-5xl">Forget Password</h1>
        <p className=" text-muted-foreground">
          Enter your email address to receive a link to reset your password.
        </p>
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default Page;
