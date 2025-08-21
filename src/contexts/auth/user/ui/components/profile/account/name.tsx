import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
type FormSchema = z.infer<typeof formSchema>;
const Name = ({ name }: FormSchema) => {
  const [editing, setEditing] = useState(false);
  const toggleEdit = () => setEditing((current) => !current);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormSchema) => {
      return await authClient.updateUser({
        name: data.name,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["profile-account"] });
      setEditing(false);
    },
    onError: (error) => {
      console.error("Error updating name:", error);
    },
  });

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(
            (data) => mutate(data),
            (error) => console.error(error)
          )}
        >
          <CardHeader className="">
            <div>
              <CardTitle>Name</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                This is the name that will be displayed on your profile. You can change it.
              </p>
              {!editing ? (
                <p className="text-foreground font-bold mt-3">{form.getValues("name")}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
              Please enter your full name, or a display name you feel comfortable with.
            </p>
            {editing ? (
              <div className="flex justify-end items-center gap-3">
                <Button onClick={toggleEdit} className="rounded-none">
                  Cancel
                </Button>
                <Button
                  disabled={!form.formState.isValid || isPending}
                  type="submit"
                  className="rounded-none"
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                </Button>
              </div>
            ) : (
              <Button onClick={toggleEdit} className="rounded-none">
                Edit
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default Name;
