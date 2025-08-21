"use client";
import { Button } from "@/components/ui/button";
import { Brand } from "@/lib/core/product/domain/brand";
import { Primitives } from "@/lib/types/primitives";
import { ColumnDef, TableMeta } from "@tanstack/react-table";
import { format } from "date-fns";
import { Pencil } from "lucide-react";

export const columns: ColumnDef<Primitives<Brand>>[] = [
  {
    accessorKey: "name",
    header: ({}) => <span>Name</span>,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "createdAt",
    header: ({}) => <span>Creation Date</span>,
    cell: ({ row }) => <span className="font-medium">{format(row.original.createdAt, "PPp")}</span>,
  },
  {
    id: "actions",
    header: ({}) => <span>Actions</span>,
    cell: ({ row, table }) => {
      const { setOpen } = table.options.meta as TableMeta<Primitives<Brand>>;
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setOpen?.(row.original.id)}>
            <Pencil className="" />
          </Button>
        </div>
      );
    },
  },
];
