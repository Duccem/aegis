import GoToHome from "@/components/auth/go-to-home";
import Oauth from "@/components/auth/oauth";
import SignInForm from "@/components/auth/sign-in-form";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex  justify-center items-center h-full">
      <div className="flex flex-col items-start justify-center w-full md:w-2/3 p-10 md:p-0 h-full gap-4">
        <GoToHome />
        <h1 className="text-5xl">Welcome</h1>
        <p className=" text-muted-foreground">
          Access your account and continue your journey with us
        </p>
        <SignInForm />
        <div className="flex items-center justify-between w-full">
          <hr className="w-full border-gray-300" />
          <span className="px-4 text-muted-foreground">or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <Oauth signIn />
        <div className="flex  items-center justify-between w-full">
          <p className="text-muted-foreground text-sm mt-4">
            Don`t have an account yet?{" "}
            <Link href="/sign-up" className="text-foreground hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="text-sm mt-4">
            <Link href="/forget-password" className="text-foreground hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
