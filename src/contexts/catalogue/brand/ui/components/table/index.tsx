"use client";

import { Brand } from "@/lib/core/product/domain/brand";
import { Primitives } from "@/lib/types/primitives";
import { useQuery } from "@tanstack/react-query";
import BrandsSkeleton from "./skeleton";
import BrandTable from "./table";

const Brands = () => {
  const { data, isPending } = useQuery({
    queryKey: ["brands"],
    initialData: [],
    queryFn: async () => {
      const response = await fetch("/api/product/brand");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return (await response.json()).data as Primitives<Brand>[];
    },
    refetchOnWindowFocus: false,
  });
  if (isPending) {
    return <BrandsSkeleton />;
  }
  return <BrandTable data={data} />;
};

export default Brands;
