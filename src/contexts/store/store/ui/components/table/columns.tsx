import { Primitives } from "@/contexts/shared/domain/primitives";
import { Badge } from "@/contexts/shared/ui/components/shadcn/badge";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import { ColumnDef } from "@tanstack/react-table";
import { MapPin } from "lucide-react";
import { Store } from "../../../domain/store";

export const columns: ColumnDef<Primitives<Store>>[] = [
  {
    accessorKey: "name",
    header: ({}) => <span>Name</span>,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "address",
    header: ({}) => <span>Address</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MapPin />
        <span className="font-medium">{row.original.address}</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: ({}) => <span>Actions</span>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            {row.original.status === "active" ? (
              <Badge className="text-green-500 border-green-500" variant={"outline"}>
                ● Active
              </Badge>
            ) : (
              <Badge className="text-red-500 border-red-500" variant={"outline"}>
                ● Active
              </Badge>
            )}
          </Button>
        </div>
      );
    },
  },
];
