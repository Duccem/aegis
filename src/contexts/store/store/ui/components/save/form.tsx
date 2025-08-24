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
import { Textarea } from "@/contexts/shared/ui/components/shadcn/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Store } from "../../../domain/store";
import { HttpStoreApi } from "../../../infrastructure/http-store-api";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
});
type FormSchema = z.infer<typeof formSchema>;
type FormProps = {
  store?: Primitives<Store>;
  toggleSheet?: VoidFunction;
};
const SaveStoreForm = ({ store, toggleSheet }: FormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: store?.name || "",
      address: store?.address || "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormSchema) => {
      await HttpStoreApi.save(data.name, data.address, store?.id);
    },
    onSuccess: () => {
      form.reset();
      toast.success(`Store ${store ? "updated" : "created"} successfully`);
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      toggleSheet?.();
    },
    onError: (error) => {
      console.error(error);
      toast.error("An error occurred while saving the store");
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => mutate(data),
          (errors) => console.error(errors),
        )}
        className="flex flex-col gap-4"
      >
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
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" onClick={() => toggleSheet?.()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Save Store"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SaveStoreForm;
