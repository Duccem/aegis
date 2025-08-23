"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/ui/components/shadcn/card";
import { useQuery } from "@tanstack/react-query";
import { Activity, Package, PackageX, Siren } from "lucide-react";
import { HttpItemApi } from "../../infrastructure/http-item-api";

const Indicators = () => {
  const { data, isPending } = useQuery({
    queryKey: ["product-metrics"],
    initialData: {
      totalProducts: 0,
      totalProductsThisMonth: 0,
      totalActiveProducts: 0,
    },
    queryFn: async () => {
      return await HttpItemApi.getItemsMetrics();
    },
    refetchOnWindowFocus: false,
  });
  if (isPending) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="@container/card animate-pulse">
            <CardHeader>
              <CardDescription>
                <div className="h-4 w-24 bg-muted rounded" />
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                <div className="h-8 w-16 bg-muted rounded" />
              </CardTitle>
              <CardAction>
                <div className="h-6 w-20 bg-muted rounded" />
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="h-4 w-32 bg-muted rounded" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-b">
      <div className="border-r">
        <Card className="@container/card border-none  bg-background">
          <CardHeader>
            <CardDescription>Total products</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {data.totalProducts}
            </CardTitle>
            <CardAction>
              <div className="flex items-center text-foreground px-2 py-2 bg-foreground/10 border border-foreground">
                <Package className="size-4" />
              </div>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <div className="border-r">
        <Card className="@container/card border-none border-x bg-background">
          <CardHeader>
            <CardDescription>Active products</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {data.totalActiveProducts}
            </CardTitle>
            <CardAction>
              <div className="flex items-center text-emerald-500 px-2 py-2 bg-emerald-500/10  border border-emerald-500">
                <Activity className="size-4" />
              </div>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <div className="border-r">
        <Card className="@container/card border-none border-x bg-background">
          <CardHeader>
            <CardDescription>Under stock</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1
            </CardTitle>
            <CardAction>
              <div className="flex items-center text-orange-500 px-2 py-2 bg-orange-500/10  border border-orange-500">
                <Siren className="size-4" />
              </div>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <div>
        <Card className="@container/card border-none border-x bg-background">
          <CardHeader>
            <CardDescription>Out of stock</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1
            </CardTitle>
            <CardAction>
              <div className="flex items-center text-red-500 px-2 py-2 bg-red-500/10  border border-red-500">
                <PackageX className="size-4" />
              </div>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Indicators;
