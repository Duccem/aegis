"use client";

import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useEffect } from "react";
import { HttpItemApi } from "../../../infrastructure/http-item-api";
import { ItemTableSkeleton } from "./loading";
import ItemsTable from "./table";

const Items = () => {
  const [filters] = useQueryStates({
    query: parseAsString,
    sort: parseAsString,
    order: parseAsString,
    page: parseAsInteger,
    limit: parseAsInteger,
  });
  const { data, isPending, refetch } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      return await HttpItemApi.search({
        query: filters.query ?? undefined,
        sort: filters.sort ?? undefined,
        order: filters.order ?? undefined,
        page: filters.page ?? undefined,
        limit: filters.limit ?? undefined,
      });
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    refetch();
  }, [filters, refetch]);
  if (isPending) {
    return <ItemTableSkeleton />;
  }
  return (
    <ItemsTable
      data={data?.items ?? []}
      meta={data?.meta ?? { page: 1, pages: 1, size: 10, total: 0 }}
    />
  );
};

export default Items;
