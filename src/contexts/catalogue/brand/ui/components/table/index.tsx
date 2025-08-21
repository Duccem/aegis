"use client";

import { useQuery } from "@tanstack/react-query";
import { HttpBrandApi } from "../../../infrastructure/http-brand-api";
import BrandsSkeleton from "./skeleton";
import BrandTable from "./table";

const Brands = () => {
  const { data, isPending } = useQuery({
    queryKey: ["brands"],
    initialData: [],
    queryFn: async () => {
      return await HttpBrandApi.list();
    },
    refetchOnWindowFocus: false,
  });
  if (isPending) {
    return <BrandsSkeleton />;
  }
  return <BrandTable data={data} />;
};

export default Brands;
