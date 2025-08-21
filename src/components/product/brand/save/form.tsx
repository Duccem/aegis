"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Brand } from "@/lib/core/product/domain/brand";
import { HttpProductApi } from "@/lib/core/product/infrastructure/http-product-api";
import { Primitives } from "@/lib/types/primitives";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
type FormSchema = z.infer<typeof formSchema>;

const SaveBrandForm = ({
  category,
  toggleSheet,
}: {
  category?: Primitives<Brand>;
  toggleSheet?: VoidFunction;
}) => {
  const queryClient = useQueryClient();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormSchema) => {
      await HttpProductApi.saveBrand(data.name, category ? category.id : undefined);
    },
    onSuccess: () => {
      console.log("Category saved successfully");
      toast.success("Category saved successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toggleSheet?.();
    },
    onError: (error) => {
      console.error("Error saving category:", error);
      toast.error("Failed to save category");
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => mutate(data),
          (error) => console.error(error),
        )}
        className="flex flex-col gap-4"
      >
        <Separator />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          {isPending ? <Loader2 className="animate-spin" /> : "Save Brand"}
        </Button>
      </form>
    </Form>
  );
};

export default SaveBrandForm;
