"use client";

import { authClient } from "@/contexts/shared/infrastructure/auth/client";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/contexts/shared/ui/components/shadcn/form";
import { Input } from "@/contexts/shared/ui/components/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});
type FormSchema = z.infer<typeof formSchema>;
const ForgetPasswordForm = () => {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const submit = async (data: FormSchema) => {
    try {
      await authClient.forgetPassword.emailOtp({
        email: data.email,
      });
      router.push(`/verify-reset?email=${data.email}`);
    } catch (error) {
      console.error("Error sending reset password email:", error);
      toast.error("Failed to send reset password email. Please try again.");
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
            name="email"
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
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Send verification code"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPasswordForm;
