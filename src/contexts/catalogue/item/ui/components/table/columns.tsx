"use client";
import { Badge } from "@/contexts/shared/ui/components/shadcn/badge";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import { Checkbox } from "@/contexts/shared/ui/components/shadcn/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/contexts/shared/ui/components/shadcn/dropdown-menu";
import { cn } from "@/contexts/shared/ui/utils/utils";

import { Primitives } from "@/contexts/shared/domain/primitives";
import { ColumnDef, Table } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, MoreHorizontal, Pencil } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Item } from "../../../domain/item";

export const columns: ColumnDef<Primitives<Item>>[] = [
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
    accessorKey: "status",
    header: ({ table }) => <span>Status</span>,
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className={cn("rounded-md", {
          "text-emerald-500": row.original.status === "active",
          "text-orange-500": row.original.status === "inactive",
          "text-red-500": row.original.status === "archived",
        })}
      >
        {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
      </Badge>
    ),
  },
  {
    accessorKey: "categories",
    header: ({ table }) => <span>Categories</span>,
    cell: ({ row, table }) => {
      const categories = (table.options.meta as any)?.categories || [];
      return (
        <div className="flex flex-wrap gap-1">
          {row.original.categoriesIds.map((category) => (
            <Badge key={category} variant="secondary" className="mr-1">
              {categories.find((cat: any) => cat.id === category)?.name || "Unknown"}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ table }) => <span>Type</span>,
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={cn("rounded-md", {
          "text-blue-600 bg-blue-600/10": row.original.type === "product",
          "bg-purple-500/10 text-purple-600": row.original.type === "service",
        })}
      >
        {row.original.type.charAt(0).toUpperCase() + row.original.type.slice(1)}
      </Badge>
    ),
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
  table: Table<Primitives<Item>>;
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
