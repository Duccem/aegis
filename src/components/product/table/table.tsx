"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/lib/core/product/domain/product";
import { Meta } from "@/lib/types/collection";
import { Primitives } from "@/lib/types/primitives";
import { cn } from "@/lib/utils";
import { useProductTableStore } from "@/store/product-table-store";
import { flexRender, getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import ProductDetails from "../details";
import { columns } from "./columns";
import ProductsTableHeader from "./header";
import ProductsTablePagination from "./pagination";

interface ProductsTableProps {
  data: Primitives<Product>[];
  meta: Meta;
  initialColumnVisibility?: VisibilityState;
}
const ProductsTable = ({ data, meta, initialColumnVisibility }: ProductsTableProps) => {
  const [productId, setProductId] = useQueryState("productId");
  const { setColumns, setRowSelection, rowSelection } = useProductTableStore();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility ?? {},
  );

  const setOpen = (id: string | boolean) => {
    if (id) {
      setProductId(id as string);
    } else {
      setProductId(null);
    }
  };

  useEffect(() => {
    setColumns(table.getAllLeafColumns());
  }, [columnVisibility]);

  const table = useReactTable({
    getRowId: (row) => row.id,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      rowSelection,
      columnVisibility,
    },
    meta: {
      setOpen,
    },
  });
  const selectedProduct = data.find((row) => row.id === productId);

  return (
    <div className="mb-8 relative w-full space-y-6">
      <ProductsTableHeader table={table} />
      <div className="border rounded-xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="h-[40px] md:h-[45px] cursor-pointer select-text border-none bg-card"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-3 md:px-4 py-2 border-none">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="h-[40px] md:h-[45px] cursor-pointer select-text">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "px-3 md:px-4 py-2 border-y",
                        (cell.column.id === "select" ||
                          cell.column.id === "date" ||
                          cell.column.id === "doctor" ||
                          cell.column.id === "status" ||
                          cell.column.id === "type") &&
                          "hidden md:table-cell",
                      )}
                      onClick={() => {
                        if (cell.column.id !== "select" && cell.column.id !== "actions") {
                          setOpen(row.id);
                        }
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ProductsTablePagination meta={meta} />
      <ProductDetails data={selectedProduct} isOpen={Boolean(productId)} setIsOpen={setOpen} />
    </div>
  );
};

export default ProductsTable;
