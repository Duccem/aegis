"use client";

import { Meta } from "@/contexts/shared/domain/collection";
import { Primitives } from "@/contexts/shared/domain/primitives";
import FilterList from "@/contexts/shared/ui/components/aegis/filter-list";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import { ComboboxDropdown } from "@/contexts/shared/ui/components/shadcn/combobox-dropdown";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/contexts/shared/ui/components/shadcn/dropdown-menu";
import {
  SelectableCell,
  SelectableHeader,
  ServerPagination,
  ServerTable,
  ServerTableLoading,
} from "@/contexts/shared/ui/components/shadcn/server-table";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  Table,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronDown, ListFilter, Package, Warehouse } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { Stock } from "../../domain/stock";
import { HttpStockApi } from "../../infrastructure/http-stock-api";

export const StockList = () => {
  const [filters] = useQueryStates({
    itemId: parseAsString,
    storeId: parseAsString,
    sort: parseAsString,
    order: parseAsString,
    page: parseAsInteger,
    limit: parseAsInteger,
  });
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["stocks"],
    initialData: [],
    queryFn: async () => {
      return await HttpStockApi.list({
        itemId: filters.itemId ?? undefined,
        storeId: filters.storeId ?? undefined,
        sort: filters.sort ?? undefined,
        order: filters.order ?? undefined,
        page: filters.page ?? undefined,
        limit: filters.limit ?? undefined,
      });
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  if (isFetching) {
    return <ServerTableLoading cellNumber={5} />;
  }

  return (
    <StockTable
      data={data}
      meta={{
        page: 1,
        pages: 1,
        size: 10,
        total: 2,
      }}
    />
  );
};

const columns: ColumnDef<Primitives<Stock>>[] = [
  {
    id: "select",
    header: ({ table }) => <SelectableHeader table={table} />,
    cell: ({ row }) => <SelectableCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "Store",
    header: () => <span>Store</span>,
    cell: ({ row }) => <span className="font-medium">{row.original.store?.name}</span>,
  },
  {
    id: "item",
    header: () => <span>Store</span>,
    cell: ({ row }) => <span className="font-medium">{row.original.item?.name}</span>,
  },
  {
    id: "Existence",
    header: () => <span>Existence</span>,
    cell: ({ row }) => <span className="font-medium">{row.original.quantity}</span>,
  },
  {
    id: "Last movement",
    header: () => <span>Last movement</span>,
    cell: ({ row }) => <span className="font-medium">{format(row.original.updatedAt, "PPp")}</span>,
  },
];

interface StockTableProps {
  data: Primitives<Stock>[];
  meta: Meta;
}
const StockTable = ({ data, meta }: StockTableProps) => {
  const [stockId, setStockId] = useQueryState("stockId");

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const setOpen = (id: string | boolean) => {
    if (id) {
      setStockId(id as string);
    } else {
      setStockId(null);
    }
  };
  const selectedStock = data.find((row) => row.id === stockId);

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

  return (
    <div className="relative w-full">
      <StockTableHeader table={table} />
      <div className="border-t">
        <ServerTable table={table} setOpen={setOpen} columns={columns} />
      </div>
      <ServerPagination meta={meta} />
    </div>
  );
};

const StockTableHeader = ({ table }: { table: Table<Primitives<Stock>> }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["stock-complements"],
    initialData: { items: [] as { id: string; name: string; color: string }[], stores: [] },
    queryFn: async () => {
      return await HttpStockApi.complements();
    },
    refetchOnWindowFocus: false,
  });
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-1">
        <div className="border-r">
          <StockTableFilter items={data.items} stores={data.stores} loading={isLoading} />
        </div>
        <TagFilters items={data.items} stores={data.stores} loading={isLoading} />
      </div>
      <div className="border-x">
        <ColumnVisibility table={table} />
      </div>
    </div>
  );
};

const StockTableFilter = ({
  items,
  stores,
  loading,
}: {
  items: { id: string; name: string }[];
  stores: { id: string; name: string }[];
  loading?: boolean;
}) => {
  const [{ itemId, storeId }, setFilters] = useQueryStates({
    itemId: parseAsString,
    storeId: parseAsString,
  });
  if (loading) {
    <Button variant={"outline"} disabled className="h-10  border-none">
      Filter
      <ListFilter className="size-4" />
      <span className="sr-only">Filter</span>
    </Button>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="h-10 cursor-pointer border-none">
          Filter
          <ListFilter className="size-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-background">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="">
            <Package className="size-4 mr-2" />
            <span>Item</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              sideOffset={14}
              alignOffset={-4}
              className="p-0 w-[250px] h-[270px] bg-background"
            >
              <ComboboxDropdown
                headless={true}
                placeholder="Selecciona un tipo de cita"
                searchPlaceholder="Busca un tipo de cita"
                items={items.map((item) => ({
                  id: item.id,
                  label: item.name,
                }))}
                selectedItem={items
                  .map((item) => ({
                    id: item.id,
                    label: item.name,
                  }))
                  .find((item) => item.id === (items.find((i) => i.id === itemId)?.id ?? ""))}
                onSelect={(item) => {
                  setFilters({ itemId: item?.id });
                }}
                renderSelectedItem={(selectedItem) => (
                  <div className="flex items-center space-x-2">
                    <span className="text-left truncate max-w-[90%]">{selectedItem.label}</span>
                  </div>
                )}
                renderListItem={({ item }) => {
                  return (
                    <div className="flex items-center space-x-2">
                      <span className="line-clamp-1">{item.label}</span>
                    </div>
                  );
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="">
            <Warehouse className="size-4 mr-2" />
            <span>Store</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              sideOffset={14}
              alignOffset={-4}
              className="p-0 w-[250px] h-[270px] bg-background"
            >
              <ComboboxDropdown
                headless={true}
                placeholder="Selecciona un tipo de cita"
                searchPlaceholder="Busca un tipo de cita"
                items={stores.map((store) => ({
                  id: store.id,
                  label: store.name,
                }))}
                selectedItem={stores
                  .map((store) => ({
                    id: store.id,
                    label: store.name,
                  }))
                  .find((store) => store.id === (stores.find((i) => i.id === storeId)?.id ?? ""))}
                onSelect={(store) => {
                  setFilters({ storeId: store?.id });
                }}
                renderSelectedItem={(selectedStore) => (
                  <div className="flex items-center space-x-2">
                    <span className="text-left truncate max-w-[90%]">{selectedStore.label}</span>
                  </div>
                )}
                renderListItem={({ item }) => {
                  return (
                    <div className="flex items-center space-x-2">
                      <span className="line-clamp-1">{item.label}</span>
                    </div>
                  );
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TagFilters = ({
  items,
  stores,
  loading,
}: {
  items: { id: string; name: string }[];
  stores: { id: string; name: string }[];
  loading?: boolean;
}) => {
  const [filters, setFilters] = useQueryStates({
    itemId: parseAsString,
    storeId: parseAsString,
  });
  const renderFilter = ({ key, value }: { key: string; value: any }): React.ReactElement => {
    switch (key) {
      case "itemId":
        return <>{`Item: ${items.find((item) => item.id === value)?.name}`}</>;
      case "storeId":
        return <>{`Store: ${stores.find((store) => store.id === value)?.name}`}</>;
      default:
        return (
          <>
            `${key}: ${value}`
          </>
        );
    }
  };
  const remove = (key: any) => {
    if (key == "itemId") {
      setFilters({ itemId: null });
    }
    if (key == "storeId") {
      setFilters({ storeId: null });
    }
    setFilters({ [key]: null });
  };
  return (
    <FilterList filters={filters} renderFilter={renderFilter} onRemove={remove} loading={loading} />
  );
};

const ColumnVisibility = ({ table }: { table: Table<Primitives<Stock>> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto border-none">
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize rounded-xl"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
