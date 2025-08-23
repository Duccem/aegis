"use client";

import { Primitives } from "@/contexts/shared/domain/primitives";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/contexts/shared/ui/components/shadcn/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Item } from "../../../domain/item";

const ItemsTableVisibility = ({ table }: { table: Table<Primitives<Item>> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto border-none">
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize rounded-xl"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ItemsTableVisibility;
