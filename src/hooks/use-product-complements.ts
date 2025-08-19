import { Brand } from "@/lib/core/product/domain/brand";
import { Category } from "@/lib/core/product/domain/category";
import { Unit } from "@/lib/core/product/domain/unit";
import { Primitives } from "@/lib/types/primitives";
import { useQueries } from "@tanstack/react-query";

export const useProductComplements = () => {
  return useQueries({
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
        refetchOnWindowFocus: false,
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
        refetchOnWindowFocus: false,
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
        refetchOnWindowFocus: false,
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
};
