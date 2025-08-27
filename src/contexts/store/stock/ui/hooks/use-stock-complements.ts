import { useQueries } from "@tanstack/react-query";

export const useStockComplements = () => {
  return useQueries({
    queries: [
      {
        queryKey: ["stores"],
      },
    ],
  });
};
