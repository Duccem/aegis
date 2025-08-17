"use client";

import { HttpProductApi } from "@/lib/core/product/infrastructure/http-product-api";
import { useQuery } from "@tanstack/react-query";
import { parseAsFloat, parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useEffect } from "react";
import { ProductTableSkeleton } from "./loading";
import ProductsTable from "./table";

const Products = () => {
  const [filters] = useQueryStates({
    query: parseAsString,
    minCost: parseAsFloat,
    maxCost: parseAsFloat,
    minPrice: parseAsFloat,
    maxPrice: parseAsFloat,
    sort: parseAsString,
    order: parseAsString,
    page: parseAsInteger,
    limit: parseAsInteger,
  });
  const { data, isPending, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await HttpProductApi.getProducts({
        query: filters.query ?? undefined,
        minCost: filters.minCost ?? undefined,
        maxCost: filters.maxCost ?? undefined,
        minPrice: filters.minPrice ?? undefined,
        maxPrice: filters.maxPrice ?? undefined,
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
    return <ProductTableSkeleton />;
  }
  return (
    <ProductsTable
      data={data?.items ?? []}
      meta={data?.meta ?? { page: 1, pages: 1, size: 10, total: 0 }}
    />
  );
};

export default Products;
