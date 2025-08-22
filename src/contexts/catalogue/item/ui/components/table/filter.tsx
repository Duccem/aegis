import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/contexts/shared/ui/components/shadcn/dropdown-menu";
import { ListFilter } from "lucide-react";
import { parseAsFloat, useQueryStates } from "nuqs";

const ProductsTableFilter = () => {
  const [_, setFilters] = useQueryStates({
    minCost: parseAsFloat,
    maxCost: parseAsFloat,
    minPrice: parseAsFloat,
    maxPrice: parseAsFloat,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} className="h-10 cursor-pointer">
          Filter
          <ListFilter className="size-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded-xl"></DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductsTableFilter;
