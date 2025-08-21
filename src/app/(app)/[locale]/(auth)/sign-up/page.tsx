import Oauth from "@/contexts/auth/user/ui/components/auth/oauth";
import SignUpForm from "@/contexts/auth/user/ui/components/auth/sign-up-form";
import GoToHome from "@/contexts/shared/ui/components/aegis/go-to-home";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex  justify-center items-center h-full">
      <div className="flex flex-col items-start justify-center w-full md:w-2/3 p-10 md:p-0 h-full gap-4">
        <GoToHome />
        <h1 className="text-5xl">Welcome</h1>
        <p className=" text-muted-foreground">Create your account to start using our services</p>
        <SignUpForm />
        <div className="flex items-center justify-between w-full">
          <hr className="w-full border-gray-300" />
          <span className="px-4 text-muted-foreground">or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <Oauth />
        <div>
          <p className="text-muted-foreground text-sm mt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-foreground hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
