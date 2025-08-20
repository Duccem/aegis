"use client";
import FilterList from "@/components/shared/filter-list";
import { useQueryStates } from "nuqs";
const ProductTagFilters = () => {
  const [filters, setFilters] = useQueryStates({});
  const renderFilter = ({ key, value }: { key: string; value: any }): React.ReactElement => {
    switch (key) {
      default:
        return (
          <>
            `${key}: ${value}`
          </>
        );
    }
  };
  const remove = (key: any) => {
    if (key == "price") {
      setFilters({ minPrice: null, maxPrice: null });
    }
    if (key == "cost") {
      setFilters({ minCost: null, maxCost: null });
    }
    setFilters({ [key]: null });
  };
  return <FilterList filters={filters} renderFilter={renderFilter} onRemove={remove} />;
};

export default ProductTagFilters;
