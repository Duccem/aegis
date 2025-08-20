"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { X } from "lucide-react";
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

//TODO - refactor this to a more generic component
const listVariant = {
  hidden: { y: 10, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.05,
      staggerChildren: 0.06,
    },
  },
};
const itemVariant = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 },
};
type FilterListProps = {
  filters: { [key: string]: string | number | boolean | string[] | number[] | null };
  onRemove: (key: any) => void;
  renderFilter: ({ key, value }: { key: string; value: any }) => React.ReactElement;
};
function FilterList({ filters, onRemove, renderFilter }: FilterListProps) {
  const handleOnRemove = (key: string) => {
    onRemove(key);
  };
  return (
    <motion.ul variants={listVariant} initial="hidden" animate="show" className="flex gap-2">
      {Object.entries(filters)
        .filter(([key, value]) => value !== null && key !== "end")
        .map(([key, value]) => {
          return (
            <motion.li key={key} variants={itemVariant}>
              <Button
                className="rounded-full h-f h-8 px-3 bg-secondary hover:bg-secondary font-normal text-[#878787] flex items-center group"
                onClick={() => handleOnRemove(key)}
              >
                <span>
                  {renderFilter({
                    key,
                    value,
                  })}
                </span>
                <X className="scale-0 group-hover:scale-100 transition-all w-0 group-hover:w-4" />
              </Button>
            </motion.li>
          );
        })}
    </motion.ul>
  );
}
