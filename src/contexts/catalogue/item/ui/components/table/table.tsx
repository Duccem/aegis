"use client";

import { useItemTableStore } from "@/contexts/catalogue/item/ui/store/item-table-store";
import { Meta } from "@/contexts/shared/domain/collection";
import { Primitives } from "@/contexts/shared/domain/primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/contexts/shared/ui/components/shadcn/table";
import { cn } from "@/contexts/shared/ui/utils/utils";
import { flexRender, getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { Item } from "../../../domain/item";
import ItemDetails from "../details";
import { columns } from "./columns";
import ItemsTableHeader from "./header";
import ProductsTablePagination from "./pagination";

interface ItemTableProps {
  data: Primitives<Item>[];
  meta: Meta;
  initialColumnVisibility?: VisibilityState;
}
const ItemsTable = ({ data, meta, initialColumnVisibility }: ItemTableProps) => {
  const [productId, setProductId] = useQueryState("productId");
  const { setColumns, setRowSelection, rowSelection } = useItemTableStore();
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
  useEffect(() => {
    setColumns(table.getAllLeafColumns());
  }, [columnVisibility]);
  const selectedProduct = data.find((row) => row.id === productId);

  return (
    <div className=" relative w-full space-y-6">
      <ItemsTableHeader table={table} />
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="h-[40px] md:h-[45px] select-text border-none hover:bg-transparent"
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
                <TableRow
                  key={row.id}
                  className="h-[40px] md:h-[45px] cursor-pointer select-text hover:bg-transparent"
                >
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
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className=" text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ProductsTablePagination meta={meta} />
      <ItemDetails data={selectedProduct} isOpen={Boolean(productId)} setIsOpen={setOpen} />
    </div>
  );
};

export default ItemsTable;
