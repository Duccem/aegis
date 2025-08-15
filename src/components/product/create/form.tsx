"use client";

import { Button } from "@/components/ui/button";
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
import InputMultipleImages from "@/components/ui/input-multiple-images";
import MultipleSelector from "@/components/ui/multiselect";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Brand } from "@/lib/core/product/domain/brand";
import { Category } from "@/lib/core/product/domain/category";
import { Unit } from "@/lib/core/product/domain/unit";
import { HttpProductApi } from "@/lib/core/product/infrastructure/http-product-api";
import { SupabaseProductUploader } from "@/lib/core/product/infrastructure/supabase-product-uploader";
import { Primitives } from "@/lib/types/primitives";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  sku: z.string().min(1, "SKU is required"),
  cost: z.coerce.number().min(0, "Cost must be at least 0"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  unitId: z.string().min(1, "Unit is required"),
  brandId: z.string().min(1, "Brand is required"),
  categories: z.array(z.string().min(1, "Category ID cannot be empty")),
  images: z.array(z.url()),
});

const transformToOptions = (items: { id: string; name: string }[]) => {
  return items.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};

const SaveProductForm = ({
  initialCategories,
  initialBrands,
  initialUnits,
  closeAction,
}: {
  initialCategories: Primitives<Category>[];
  initialBrands: Primitives<Brand>[];
  initialUnits: Primitives<Unit>[];
  closeAction?: () => void;
}) => {
  const [images, setImages] = useState<File[]>([]);
  const categories = transformToOptions(initialCategories);
  const brands = transformToOptions(initialBrands);
  const units = transformToOptions(initialUnits);
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "product 01",
      description: "",
      sku: "",
      cost: 0,
      price: 0,
      unitId: "",
      brandId: "",
      categories: [],
      images: [],
    },
    mode: "onBlur",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const storage = new SupabaseProductUploader();
      const imageUrls = await storage.uploadImages(images);
      await HttpProductApi.createProduct({
        name: data.name,
        sku: data.sku,
        description: data.description,
        price: data.price,
        cost: data.cost,
        images: imageUrls,
        unitId: data.unitId,
        brandId: data.brandId,
        categories: data.categories,
      });
    },
    onSuccess: () => {
      form.reset();
      setImages([]);
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeAction?.();
    },
    onError: (error) => {
      toast.error("An unexpected error occurred");
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
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <div className="relative flex rounded-md shadow-xs">
                    <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="cost"
                      {...field}
                      value={field.value as number}
                      className="-me-px rounded-e-none ps-6 shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <span className="border-input bg-background text-muted-foreground  inline-flex items-center rounded-e-md border px-3 text-sm">
                      USD
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="relative flex rounded-md shadow-xs">
                    <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="cost"
                      {...field}
                      value={field.value as number}
                      className="-me-px rounded-e-none ps-6 shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <span className="border-input bg-background text-muted-foreground  inline-flex items-center rounded-e-md border px-3 text-sm">
                      USD
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
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
                      <CommandInput placeholder="Search framework..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
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
                            <PlusIcon size={16} className="-ms-2 opacity-60" aria-hidden="true" />
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
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <InputMultipleImages
                  value={field.value}
                  changeAction={(urls) => {
                    field.onChange(urls);
                  }}
                  selectFileAction={(files) => {
                    setImages(files);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4">
          {isPending ? <Loader2 className="animate-spin" /> : "Save Product"}
        </Button>
      </form>
    </Form>
  );
};

export default SaveProductForm;

function BrandComboBox() {}
