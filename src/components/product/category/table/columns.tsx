import { Category } from "@/lib/core/product/domain/category";
import { Primitives } from "@/lib/types/primitives";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Primitives<Category>>[] = [
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
];
