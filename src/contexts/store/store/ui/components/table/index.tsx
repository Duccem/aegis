"use client";

import { useQuery } from "@tanstack/react-query";
import { HttpStoreApi } from "../../../infrastructure/http-store-api";
import StoresSkeleton from "./skeleton";
import StoresTable from "./table";

const Stores = () => {
  const { data, isPending } = useQuery({
    queryKey: ["stores"],
    initialData: [],
    queryFn: async () => {
      return await HttpStoreApi.list();
    },
    refetchOnWindowFocus: false,
  });
  if (isPending) {
    return <StoresSkeleton />;
  }
  return <StoresTable data={data} />;
};

export default Stores;
