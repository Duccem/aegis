import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconCash } from "@tabler/icons-react";
import { ListFilter } from "lucide-react";
import { parseAsFloat, useQueryStates } from "nuqs";
import CurrencyRange from "./filters/currency-range";

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
      <DropdownMenuContent align="start" className="rounded-xl">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="">
            <IconCash className="size-4 mr-2" />
            <span>Cost</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent
              sideOffset={14}
              alignOffset={-4}
              className="p-0 rounded-xl bg-background"
            >
              <CurrencyRange
                selectAction={(val) =>
                  setFilters({
                    minCost: val[0],
                    maxCost: val[1],
                  })
                }
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="">
            <IconCash className="size-4 mr-2" />
            <span>Price</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent
              sideOffset={14}
              alignOffset={-4}
              className="p-0 rounded-xl bg-background"
            >
              <CurrencyRange
                selectAction={(val) =>
                  setFilters({
                    minPrice: val[0],
                    maxPrice: val[1],
                  })
                }
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductsTableFilter;
