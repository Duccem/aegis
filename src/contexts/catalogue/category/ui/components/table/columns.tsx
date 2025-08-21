import { Primitives } from "@/contexts/shared/domain/primitives";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import { ColumnDef, TableMeta } from "@tanstack/react-table";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { Category } from "../../../domain/category";

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
  {
    id: "actions",
    header: ({}) => <span>Actions</span>,
    cell: ({ row, table }) => {
      const { setOpen } = table.options.meta as TableMeta<Primitives<Category>>;
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
