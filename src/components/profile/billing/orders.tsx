"use client";

import { HttpOrganizationApi } from "@/lib/core/organization/infrastructure/http-organization-api";
import { useInfiniteQuery } from "@tanstack/react-query";

// TODO: Implement orders retrieval functionality
const Orders = () => {
  const {
    data: orders,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: async ({ pageParam = 1 }) => {
      return await HttpOrganizationApi.getOrders({
        input: {
          cursor: pageParam,
          pageSize: 10,
        },
      });
    },
    initialPageParam: 1,
    getNextPageParam: ({ meta }) => meta?.cursor,
  });
  return <div></div>;
};

export default Orders;
