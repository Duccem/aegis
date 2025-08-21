import { Primitives } from "@/contexts/shared/domain/primitives";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/contexts/shared/ui/components/shadcn/form";
import { Input } from "@/contexts/shared/ui/components/shadcn/input";
import { Separator } from "@/contexts/shared/ui/components/shadcn/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Category } from "../../../domain/category";
import { HttpCategoryApi } from "../../../infrastructure/http-category-api";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
type FormSchema = z.infer<typeof formSchema>;
const SaveCategoryForm = ({
  category,
  toggleSheet,
}: {
  category?: Primitives<Category>;
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
      await HttpCategoryApi.save(data.name, category ? category.id : undefined);
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
          {isPending ? <Loader2 className="animate-spin" /> : "Save Category"}
        </Button>
      </form>
    </Form>
  );
};

export default SaveCategoryForm;
