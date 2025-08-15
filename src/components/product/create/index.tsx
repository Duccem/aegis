"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Brand } from "@/lib/core/product/domain/brand";
import { Category } from "@/lib/core/product/domain/category";
import { Unit } from "@/lib/core/product/domain/unit";
import { Primitives } from "@/lib/types/primitives";
import { useQueries } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import SaveProductForm from "./form";

const CreateNewProduct = () => {
  const [open, setOpen] = useState(false);
  const { brands, categories, units, isPending } = useQueries({
    queries: [
      {
        queryKey: ["units"],
        initialData: [],
        queryFn: async () => {
          const result = await fetch("/api/product/unit");
          if (!result.ok) {
            throw new Error("Failed to fetch units");
          }
          return (await result.json()).data as Primitives<Unit>[];
        },
      },
      {
        queryKey: ["brands"],
        initialData: [],
        queryFn: async () => {
          const result = await fetch("/api/product/brand");
          if (!result.ok) {
            throw new Error("Failed to fetch units");
          }
          return (await result.json()).data as Primitives<Brand>[];
        },
      },
      {
        queryKey: ["categories"],
        initialData: [],
        queryFn: async () => {
          const result = await fetch("/api/product/category");
          if (!result.ok) {
            throw new Error("Failed to fetch units");
          }
          return (await result.json()).data as Primitives<Category>[];
        },
      },
    ],
    combine: (results) => {
      return {
        units: results[0].data,
        brands: results[1].data,
        categories: results[2].data,
        isPending: results.some((result) => result.isPending),
      };
    },
  });
  if (isPending) {
    return (
      <Button variant={"outline"} disabled>
        <PlusCircle />
        New
      </Button>
    );
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <PlusCircle />
          New
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-xl">
          <SheetHeader className="px-0">
            <SheetTitle>Create New Product</SheetTitle>
          </SheetHeader>
          <div className="w-full">
            <SaveProductForm
              initialBrands={brands}
              initialCategories={categories}
              initialUnits={units}
              closeAction={() => setOpen(false)}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateNewProduct;
