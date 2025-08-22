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
import { HttpOrganizationApi } from "../../infrastructure/http-organization-api";

const formSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
});
type FormSchema = z.infer<typeof formSchema>;
const OrganizationForm = () => {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = form;
  const submit = async (data: FormSchema) => {
    try {
      const org = await authClient.organization.create({
        name: data.name,
        slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      });
      await HttpOrganizationApi.initializeMetrics(org.data?.id ?? "");
      toast.success("Organization created successfully!");
      router.push("/home");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create organization. Please try again.");
    }
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(submit, (e) => console.error(e))}
          className="w-full  flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add a name to your organization</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Acme Inc" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Create Organization"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrganizationForm;
