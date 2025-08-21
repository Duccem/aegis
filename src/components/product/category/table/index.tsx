"use client";

import { Category } from "@/lib/core/product/domain/category";
import { Primitives } from "@/lib/types/primitives";
import { useQuery } from "@tanstack/react-query";
import CategoriesSkeleton from "./skeleton";
import CategoryTable from "./table";

const Categories = () => {
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    initialData: [],
    queryFn: async () => {
      const response = await fetch("/api/product/category");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return (await response.json()).data as Primitives<Category>[];
    },
    refetchOnWindowFocus: false,
  });
  if (isPending) {
    return <CategoriesSkeleton />;
  }
  return <CategoryTable data={data} />;
};

export default Categories;
