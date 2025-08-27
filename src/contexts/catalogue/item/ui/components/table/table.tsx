"use client";

import { Category } from "@/contexts/catalogue/category/domain/category";
import { useItemTableStore } from "@/contexts/catalogue/item/ui/store/item-table-store";
import { Meta } from "@/contexts/shared/domain/collection";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { ServerPagination, ServerTable } from "@/contexts/shared/ui/components/shadcn/server-table";
import { getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { Item } from "../../../domain/item";
import ItemDetails from "../details";
import { columns } from "./columns";
import ItemsTableHeader from "./header";

interface ItemTableProps {
  data: Primitives<Item>[];
  categories: Primitives<Category>[];
  meta: Meta;
  initialColumnVisibility?: VisibilityState;
}
const ItemsTable = ({ data, meta, initialColumnVisibility, categories }: ItemTableProps) => {
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
      categories,
    },
  });
  useEffect(() => {
    setColumns(table.getAllLeafColumns());
  }, [columnVisibility]);
  const selectedProduct = data.find((row) => row.id === productId);

  return (
    <div className=" relative w-full">
      <div className="p-6 border-b">
        <p>
          All items: <span className="font-medium">{meta.total}</span>
        </p>
      </div>
      <ItemsTableHeader table={table} />
      <div className="border-t rounded-md">
        <ServerTable table={table} setOpen={setOpen} columns={columns} />
      </div>
      <ServerPagination meta={meta} />
      <ItemDetails data={selectedProduct} isOpen={Boolean(productId)} setIsOpen={setOpen} />
    </div>
  );
};

export default ItemsTable;
