import { Primitives } from "@/contexts/shared/domain/primitives";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Store } from "../../../domain/store";
import { HttpStoreApi } from "../../../infrastructure/http-store-api";

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
      const queryClient = useQueryClient();
      const { mutate, isPending } = useMutation({
        mutationFn: async () => {
          await HttpStoreApi.toggleStatus(row.original.id);
        },
        onSuccess: () => {
          toast.success(`Store status updated successfully`);
          queryClient.invalidateQueries({ queryKey: ["stores"] });
        },
        onError: (error) => {
          console.error(error);
          toast.error("An error occurred while updating the store status");
        },
      });
      return (
        <div className="flex items-center gap-2">
          <>
            {row.original.status === "active" ? (
              <Button
                disabled={isPending}
                onClick={() => mutate()}
                className="text-green-500 border-green-500 cursor-pointer"
                variant={"outline"}
                size={"sm"}
              >
                {!isPending ? "●" : <Loader2 className="animate-spin" />} Active
              </Button>
            ) : (
              <Button
                disabled={isPending}
                onClick={() => mutate()}
                className="text-red-500 border-red-500 cursor-pointer"
                variant={"outline"}
                size={"sm"}
              >
                {!isPending ? "●" : <Loader2 className="animate-spin" />} Disabled
              </Button>
            )}
          </>
        </div>
      );
    },
  },
];
