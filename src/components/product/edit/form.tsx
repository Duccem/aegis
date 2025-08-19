"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiselect";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Brand } from "@/lib/core/product/domain/brand";
import { Category } from "@/lib/core/product/domain/category";
import { Product } from "@/lib/core/product/domain/product";
import { Unit } from "@/lib/core/product/domain/unit";
import { HttpProductApi } from "@/lib/core/product/infrastructure/http-product-api";
import { Primitives } from "@/lib/types/primitives";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string(),
  unitId: z.string().min(1, "Unit is required"),
  brandId: z.string().min(1, "Brand is required"),
  categories: z.array(z.string().min(1, "Category ID cannot be empty")),
});
type FormValues = z.infer<typeof formSchema>;
const transformToOptions = (items: { id: string; name: string }[]) => {
  return items.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};
const EditItemForm = ({
  product,
  toggleEdit,
  complements,
}: {
  product: Primitives<Product>;
  toggleEdit: VoidFunction;
  complements: {
    brands: Primitives<Brand>[];
    categories: Primitives<Category>[];
    units: Primitives<Unit>[];
  };
}) => {
  const categories = transformToOptions(complements.categories);
  const brands = transformToOptions(complements.brands);
  const units = transformToOptions(complements.units);
  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      sku: product.sku,
      description: product.description || "",
      unitId: product.unit?.id ?? "",
      brandId: product.brand?.id ?? "",
      categories: product.categories?.map((category) => category.id) || [],
    },
  });
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: FormValues) => {
      await HttpProductApi.updateProduct(product.id, data);
    },
    onSuccess: () => {
      console.log("Product updated successfully");
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toggleEdit();
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Editing {product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              (data) => mutate(data),
              (error) => console.error(error),
            )}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-2">
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
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="sku" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="name" {...field} className="resize-none" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="unitId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit of messure</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select the unit of messure" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"secondary"}
                          role="combobox"
                          className={cn(
                            "w-full justify-between rounded-none",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? brands.find((brand) => brand.value === field.value)?.label
                            : "Select brand"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search brand..." className="h-9" />
                          <CommandList>
                            <CommandEmpty>No brand found.</CommandEmpty>
                            <CommandGroup>
                              {brands.map((brand) => (
                                <CommandItem
                                  value={brand.label}
                                  key={brand.value}
                                  onSelect={() => {
                                    form.setValue("brandId", brand.value);
                                  }}
                                >
                                  {brand.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      brand.value === field.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup>
                              <Button variant="ghost" className="w-full justify-start font-normal">
                                <PlusIcon
                                  size={16}
                                  className="-ms-2 opacity-60"
                                  aria-hidden="true"
                                />
                                New brand
                              </Button>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel>Categories</FormLabel>
                  <MultipleSelector
                    commandProps={{ label: "Select categories" }}
                    defaultOptions={categories}
                    emptyIndicator={<p className="text-center text-sm">No results found</p>}
                    value={field.value.map((id) => {
                      const category = categories.find((cat) => cat.value === id);
                      return category ? category : { value: id, label: id };
                    })}
                    onChange={(items) => {
                      field.onChange(items.map((item) => item.value));
                    }}
                  />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                onClick={() => {
                  toggleEdit();
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {isPending ? <Loader2 className="animate-spin" /> : "Save Product"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditItemForm;
