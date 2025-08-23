"use client";

import { Brand } from "@/contexts/catalogue/brand/domain/brand";
import { Category } from "@/contexts/catalogue/category/domain/category";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/contexts/shared/ui/components/shadcn/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/contexts/shared/ui/components/shadcn/form";
import { Input } from "@/contexts/shared/ui/components/shadcn/input";
import InputMultipleImages from "@/contexts/shared/ui/components/shadcn/input-multiple-images";
import MultipleSelector from "@/contexts/shared/ui/components/shadcn/multiselect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/contexts/shared/ui/components/shadcn/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/contexts/shared/ui/components/shadcn/select";
import { Separator } from "@/contexts/shared/ui/components/shadcn/separator";
import { Textarea } from "@/contexts/shared/ui/components/shadcn/textarea";
import { cn } from "@/contexts/shared/ui/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Unit } from "../../../domain/unit";
import { HttpItemApi } from "../../../infrastructure/http-item-api";
import { SupabaseItemImageUploader } from "../../../infrastructure/supabase-item-uploader";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  sku: z.string().min(1, "SKU is required"),
  unitId: z.string().min(1, "Unit is required"),
  brandId: z.string().min(1, "Brand is required"),
  categories: z.array(z.string().min(1, "Category ID cannot be empty")),
  type: z.enum(["product", "service"]),
  images: z.array(z.url()),
});

const transformToOptions = (items: { id: string; name: string }[]) => {
  return items.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};

const SaveItemForm = ({
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
      unitId: "",
      brandId: "",
      categories: [],
      images: [],
      type: "product",
    },
    mode: "onBlur",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const storage = new SupabaseItemImageUploader();
      const imageUrls = await storage.uploadImages(images);
      await HttpItemApi.create({
        name: data.name,
        sku: data.sku,
        description: data.description,
        images: imageUrls,
        unitId: data.unitId,
        brandId: data.brandId,
        categories: data.categories,
        type: data.type,
      });
    },
    onSuccess: () => {
      form.reset();
      setImages([]);
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["items"] });
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the unit of messure" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"product"}>Product</SelectItem>
                  <SelectItem value={"service"}>Service</SelectItem>
                </SelectContent>
              </Select>
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

export default SaveItemForm;

function BrandComboBox() {}
