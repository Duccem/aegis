"use client";
import { Badge } from "@/contexts/shared/ui/components/shadcn/badge";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/contexts/shared/ui/components/shadcn/dropdown-menu";
import { cn } from "@/contexts/shared/ui/utils/utils";

import { Primitives } from "@/contexts/shared/domain/primitives";
import {
  SelectableCell,
  SelectableHeader,
  SortableHeader,
} from "@/contexts/shared/ui/components/shadcn/server-table";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";
import { Item } from "../../../domain/item";

export const columns: ColumnDef<Primitives<Item>>[] = [
  {
    id: "select",
    header: ({ table }) => <SelectableHeader table={table} />,
    cell: ({ row }) => <SelectableCell row={row} />,
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
