"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputPassword } from "@/components/ui/input-password";
import { authClient } from "@/lib/auth/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const DeleteAccountSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      await authClient.deleteUser({
        password,
      });
      setIsSubmitting(false);
      toast.info("Deleting account...");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Card className="rounded-none bg-transparent border-destructive">
      <CardHeader className="">
        <div>
          <CardTitle>Delete account</CardTitle>
          <p className="text-muted-foreground text-sm mt-5">
            Permanently delete your personal account and all its content from the Midday platform.
            This action is irreversible, so please proceed with caution.
          </p>
        </div>
      </CardHeader>
      <CardFooter className="border-t pt-4 flex justify-end items-start gap-2 md:items-center flex-col md:flex-row">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="rounded-none text-foreground" variant="destructive">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:rounded-none ">
            <AlertDialogHeader>
              <AlertDialogTitle className="">Warning!</AlertDialogTitle>
              <AlertDialogDescription className="">
                Are you sure you want to delete your account? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Password</label>
              <InputPassword
                className="rounded-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <AlertDialogFooter className="flex w-full justify-end items-center">
              <AlertDialogCancel className="rounded-none max-sm:w-full">Cancel</AlertDialogCancel>
              <AlertDialogAction asChild className="bg-destructive text-primary">
                <Button
                  variant="destructive"
                  className="rounded-none max-sm:w-full"
                  onClick={onSubmit}
                  disabled={isSubmitting || password === ""}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete account"}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
