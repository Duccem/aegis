"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/lib/core/product/domain/product";
import { Primitives } from "@/lib/types/primitives";
import { ColumnDef, Table } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, MoreHorizontal, Pencil } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const columns: ColumnDef<Primitives<Product>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ table }) => (
      <SortableHeader name="name" table={table}>
        <span>Name</span>
      </SortableHeader>
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "sku",
    header: ({ table }) => (
      <SortableHeader name="sku" table={table}>
        <span>SKU</span>
      </SortableHeader>
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.sku}</span>,
  },
  {
    accessorKey: "cost",
    header: ({ table }) => (
      <SortableHeader name="cost" table={table}>
        <span>Cost</span>
      </SortableHeader>
    ),
    cell: ({ row }) => <span className="font-medium">${row.original.price.toFixed(2)}</span>,
  },
  {
    accessorKey: "price",
    header: ({ table }) => (
      <SortableHeader name="price" table={table}>
        <span>Price</span>
      </SortableHeader>
    ),
    cell: ({ row }) => <span className="font-medium">${row.original.price.toFixed(2)}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuItem className="rounded-xl">
              <Pencil />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function SortableHeader({
  table,
  children,
  name,
}: {
  table: Table<Primitives<Product>>;
  name: string;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const column = searchParams.get("sort");
  const order = searchParams.get("order");
  const createSortQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      const prevSort = params.get("sort");
      const prevOrder = params.get("order");

      params.set("sort", name);

      if (prevSort === name) {
        if (prevOrder === "ASC") {
          params.set("order", "DESC");
        } else if (prevOrder === "DESC") {
          params.delete("sort");
          params.delete("order");
        } else {
          params.set("order", "ASC");
        }
      } else {
        params.set("order", "ASC");
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );
  const isVisible = (id: any) =>
    table
      .getAllLeafColumns()
      .find((col: any) => col.id === id)
      ?.getIsVisible() ?? false;

  if (isVisible(name)) {
    return (
      <Button className=" cursor-pointer" variant="ghost" onClick={() => createSortQuery(name)}>
        {children}
        {name === column && order === "ASC" && <ArrowUp size={16} />}
        {name === column && order === "DESC" && <ArrowDown size={16} />}
      </Button>
    );
  }
  return null;
}
