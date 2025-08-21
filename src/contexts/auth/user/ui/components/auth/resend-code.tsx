"use client";

import { authClient } from "@/lib/auth/client";
import { Loader2 } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

const ResendCode = ({
  type = "email-verification",
}: {
  type?: "forget-password" | "email-verification";
}) => {
  const [sending, setSending] = useState(false);
  const [email] = useQueryState("email", parseAsString.withDefault(""));
  const resend = async () => {
    setSending(true);
    await authClient.emailOtp.sendVerificationOtp({
      email,
      type,
    });
    setSending(false);
  };
  return (
    <div>
      <p className="text-muted-foreground text-sm mt-4 flex items-center gap-2">
        Don't receive the code?{" "}
        <span className="text-foreground hover:underline cursor-pointer" onClick={resend}>
          Resend Code
        </span>
        {sending && <Loader2 className="animate-spin size-4" />}
      </p>
    </div>
  );
};

export default ResendCode;
