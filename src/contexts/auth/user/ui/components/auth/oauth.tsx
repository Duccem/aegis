"use client";

import { authClient } from "@/contexts/shared/infrastructure/auth/client";
import Facebook from "@/contexts/shared/ui/components/icons/facebook-icon";
import Google from "@/contexts/shared/ui/components/icons/google-icon";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";

const Oauth = ({ signIn = false }: { signIn?: boolean }) => {
  const socialLogin = async (provider: "google" | "facebook") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: `${window.location.origin}/${signIn ? "home" : "start-organization"}`,
      });
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <Button variant={"outline"} onClick={() => socialLogin("google")} className="gap-3">
        <Google />
        Sign with Google
      </Button>
      <Button variant={"outline"} onClick={() => socialLogin("google")} className="gap-3">
        <Facebook />
        Sign with Facebook
      </Button>
    </div>
  );
};

export default Oauth;
