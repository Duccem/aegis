"use client";

import { useQuery } from "@tanstack/react-query";
import CategoriesSkeleton from "./skeleton";
import CategoryTable from "./table";
import { HttpCategoryApi } from "../../../infrastructure/http-category-api";

const Categories = () => {
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    initialData: [],
    queryFn: async () => {
      return await HttpCategoryApi.list();
    },
    refetchOnWindowFocus: false,
  });
  if (isPending) {
    return <CategoriesSkeleton />;
  }
  return <CategoryTable data={data} />;
};

export default Categories;
