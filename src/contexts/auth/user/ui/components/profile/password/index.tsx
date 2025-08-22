"use client";

import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/ui/components/shadcn/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/contexts/shared/ui/components/shadcn/form";
import { InputPassword } from "@/contexts/shared/ui/components/shadcn/input-password";
import { authClient } from "@/lib/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    newPassword: z.string().min(5, { message: "Password must be at least 5 characters long" }),
    confirmPassword: z.string().min(5, { message: "Password must be at least 5 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ChangePasswordForm = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "all",
  });
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return await authClient.changePassword({
        newPassword: data.newPassword,
        currentPassword: data.confirmPassword,
      });
    },
    onSuccess: () => {
      toast.success("Password updated successfully");
      router.push("/profile");
    },
    onError: (error) => {
      console.error("Error updating password:", error);
      toast.error("Error updating password");
    },
  });

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(
            (data) => mutate(data),
            (error) => console.error(error),
          )}
        >
          <CardHeader className="pb-5">
            <div>
              <CardTitle>Password</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                Change your password to keep your account secure.
              </p>
              <div className="flex flex-col w-full justify-between items-center gap-3 mt-6">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <InputPassword {...field} className="rounded-none"></InputPassword>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="flex-1  w-full">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <InputPassword {...field} className="rounded-none"></InputPassword>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
              By clicking Save, you accept our Privacy Policy and Terms of Service.
            </p>
            <Button
              disabled={!form.formState.isValid || isPending}
              variant="destructive"
              type="submit"
              className="rounded-none"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ChangePasswordForm;
