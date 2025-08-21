"use client";
import { authClient } from "@/lib/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../../../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../../../../components/ui/form";
import { Input } from "../../../../../../components/ui/input";

const formSchema = z.object({
  code: z.string().min(1, "Code is required"),
});

type FormSchema = z.infer<typeof formSchema>;
const VerifyForm = () => {
  const router = useRouter();
  const [email] = useQueryState("email", parseAsString.withDefault(""));
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });
  const submit = async (data: FormSchema) => {
    try {
      await authClient.emailOtp.verifyEmail({
        otp: data.code,
        email,
      });
      router.push("/start-organization");
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred while verifying your email. Please try again.");
    }
  };
  const {
    formState: { isSubmitting },
  } = form;
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit, (errors) => console.error(errors))}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="example@domain.com" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Verify Email"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VerifyForm;
