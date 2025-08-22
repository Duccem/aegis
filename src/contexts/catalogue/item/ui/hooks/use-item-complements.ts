import { HttpBrandApi } from "@/contexts/catalogue/brand/infrastructure/http-brand-api";
import { HttpCategoryApi } from "@/contexts/catalogue/category/infrastructure/http-category-api";
import { useQueries } from "@tanstack/react-query";
import { HttpItemApi } from "../../infrastructure/http-item-api";

export const useItemComplements = () => {
  return useQueries({
    queries: [
      {
        queryKey: ["units"],
        initialData: [],
        queryFn: async () => HttpItemApi.units(),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["brands"],
        initialData: [],
        queryFn: async () => HttpBrandApi.list(),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["categories"],
        initialData: [],
        queryFn: async () => HttpCategoryApi.list(),
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
