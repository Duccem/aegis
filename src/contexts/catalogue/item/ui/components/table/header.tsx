"use client";
import { Primitives } from "@/lib/types/primitives";
import { Table } from "@tanstack/react-table";
import { Item } from "../../../domain/item";
import ProductsTableFilter from "./filter";
import ProductSearch from "./search";
import ProductTagFilters from "./tag-filters";
import ItemsTableVisibility from "./visibility";

const ItemsTableHeader = ({ table }: { table: Table<Primitives<Item>> }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <ProductSearch />
        <ProductsTableFilter />
        <ProductTagFilters />
      </div>
      <div className="flex flex-1">
        <ItemsTableVisibility table={table} />
      </div>
    </div>
  );
};

export default ItemsTableHeader;
