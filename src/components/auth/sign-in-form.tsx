"use client";

import { authClient } from "@/lib/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormSchema = z.infer<typeof formSchema>;
const SignInForm = () => {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submit = async (data: FormSchema) => {
    try {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      router.push("/home");
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An error occurred while signing in. Please try again.");
    }
  };
  const {
    formState: { isSubmitting },
  } = form;
  return (
    <div className="grid gap-4 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit, (error) => console.error(error))}
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
