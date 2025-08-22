"use client";

import { useItemComplements } from "@/contexts/catalogue/item/ui/hooks/use-item-complements";
import { Primitives } from "@/contexts/shared/domain/primitives";
import { Badge } from "@/contexts/shared/ui/components/shadcn/badge";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/ui/components/shadcn/card";
import { Separator } from "@/contexts/shared/ui/components/shadcn/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/contexts/shared/ui/components/shadcn/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/contexts/shared/ui/components/shadcn/tabs";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Archive, Building2, Calendar, Loader2, Package, Pencil, Tag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Item } from "../../../domain/item";
import { HttpItemApi } from "../../../infrastructure/http-item-api";
import EditItemForm from "../edit/form";
import { ItemAnalytics } from "./analytics";
import ItemGallery from "./gallery";
import { ItemInventory } from "./inventory";
import ItemOverview from "./overview";
import ProductPrice from "./prices";
import { ItemSuppliers } from "./suppliers";

const ItemDetails = ({
  data,
  isOpen,
  setIsOpen,
}: {
  data: Primitives<Item> | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const complements = useItemComplements();
  const queryClient = useQueryClient();

  const { mutate: toggle, isPending: togglePending } = useMutation({
    mutationFn: async () => {
      await HttpItemApi.toggleStatus(data?.id ?? "");
    },
    onSuccess: () => {
      toast.success("Product status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", data?.id] });
      queryClient.invalidateQueries({ queryKey: ["item-metrics"] });
    },
    onError: (error) => {
      toast.error(`Failed to update product status: ${error.message}`);
    },
  });

  const { mutate: archive, isPending: archivePending } = useMutation({
    mutationFn: async () => {
      await HttpItemApi.archive(data?.id ?? "");
    },
    onSuccess: () => {
      toast.success("Product archived successfully");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", data?.id] });
      queryClient.invalidateQueries({ queryKey: ["item-metrics"] });
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to archive product: ${error.message}`);
    },
  });

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:w-1/2 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none no-scroll">
        <div className="bg-background p-6 border border-sidebar h-full flex flex-col flex-1 overflow-y-auto no-scroll space-y-5 rounded-xl relative">
          <Button
            variant={"ghost"}
            onClick={() => setIsOpen(false)}
            className="p-2 absolute top-2 right-2"
          >
            <X />
          </Button>

          <SheetHeader className="flex flex-row items-center justify-between py-0">
            <div className="flex items-center gap-4">
              <Package className="size-8" />
              <SheetTitle>
                <p>{data?.name ?? ""}</p>
                <p>SKU: {data?.sku}</p>
              </SheetTitle>
              <Button
                variant={"outline"}
                onClick={() => toggle()}
                disabled={togglePending || data?.status === "archived"}
                className="cursor-pointer"
              >
                {data?.status === "active" && !togglePending && (
                  <span className="text-emerald-500">Enabled</span>
                )}
                {data?.status === "inactive" && !togglePending && (
                  <span className="text-orange-500">Disabled</span>
                )}
                {data?.status === "archived" && !togglePending && (
                  <span className="text-red-500">Archived</span>
                )}
                {togglePending && <Loader2 className="animate-spin text-muted-foreground" />}
              </Button>
              {data?.status !== "archived" && (
                <Button variant={"outline"} className="cursor-pointer" onClick={() => archive()}>
                  {archivePending ? (
                    <Loader2 className="animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Archive />
                      Archive
                    </>
                  )}
                </Button>
              )}
              <div>
                <Badge
                  className={cn("rounded-full", {
                    "bg-blue-600 text-white": data?.type === "product",
                    "bg-purple-500 text-white": data?.status === "inactive",
                  })}
                >
                  {(data?.type?.charAt(0)?.toUpperCase() ?? "") + data?.type.slice(1)}
                </Badge>
              </div>
            </div>
          </SheetHeader>
          <div className="flex flex-col flex-1 overflow-y-auto no-scroll gap-4">
            {isEditing ? (
              <EditItemForm
                item={data!}
                toggleEdit={() => setIsEditing((current) => !current)}
                complements={complements}
              />
            ) : (
              <>
                <Card className="">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Product Information</CardTitle>
                    <Button
                      size="sm"
                      className="rounded-xl"
                      variant={"ghost"}
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {data?.type === "product" && (
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Brand</p>
                            <p className="font-semibold">
                              {complements.brands.find((b) => b.id === data?.brandId)?.name ?? ""}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <Tag className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Categories</p>
                          <div className="flex flex-wrap gap-1">
                            {data?.categoriesIds.map((category) => (
                              <Badge key={category} variant="secondary" className="mr-1">
                                {complements.categories.find((c) => c.id === category)?.name ?? ""}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {data?.type === "product" && (
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Unit</p>
                            <p className="font-semibold">
                              {complements.units.find((u) => u.id === data?.unitId)?.name ?? ""}{" "}
                              {complements.units.find((u) => u.id === data?.unitId)?.abbreviation ??
                                ""}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                      <p className="text-foreground">{data?.description}</p>
                    </div>

                    <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Created:{" "}
                          {data?.createdAt
                            ? new Date(data.createdAt).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Updated:{" "}
                          {data?.updatedAt
                            ? new Date(data.updatedAt).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Tabs className="w-full" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-6 rounded-xl mb-2">
                    <TabsTrigger value="overview" className="rounded-xl">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="pricing" className="rounded-xl">
                      Pricing
                    </TabsTrigger>
                    <TabsTrigger value="inventory" className="rounded-xl">
                      Inventory
                    </TabsTrigger>
                    <TabsTrigger value="suppliers" className="rounded-xl">
                      Suppliers
                    </TabsTrigger>
                    <TabsTrigger value="gallery" className="rounded-xl">
                      Gallery
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="rounded-xl">
                      Analytics
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="">
                    <ItemOverview item={data!} units={complements.units} />
                  </TabsContent>
                  <TabsContent value="pricing">
                    <ProductPrice item={data!} />
                  </TabsContent>
                  <TabsContent value="gallery">
                    <ItemGallery item={data!} />
                  </TabsContent>
                  <TabsContent value="inventory">
                    <ItemInventory item={data!} units={complements.units} />
                  </TabsContent>
                  <TabsContent value="suppliers">
                    <ItemSuppliers item={data!} units={complements.units} />
                  </TabsContent>
                  <TabsContent value="analytics">
                    <ItemAnalytics item={data!} />
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ItemDetails;
