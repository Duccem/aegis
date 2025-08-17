"use client";
import { Product } from "@/lib/core/product/domain/product";
import { Primitives } from "@/lib/types/primitives";
import { Table } from "@tanstack/react-table";
import ProductsTableFilter from "./filter";
import ProductSearch from "./search";
import ProductTagFilters from "./tag-filters";
import ProductsTableVisibility from "./visibility";

const ProductsTableHeader = ({ table }: { table: Table<Primitives<Product>> }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <ProductSearch />
        <ProductsTableFilter />
        <ProductTagFilters />
      </div>
      <div className="flex flex-1">
        <ProductsTableVisibility table={table} />
      </div>
    </div>
  );
};

export default ProductsTableHeader;
