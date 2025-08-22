"use client";
import { HttpProductApi } from "@/lib/core/product/infrastructure/http-product-api";
import { IconTrendingUp } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Activity, AlertTriangle, ArrowDown, ArrowRight, Package } from "lucide-react";
import { Badge } from "../../../../../components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";

const Indicators = () => {
  const { data, isPending } = useQuery({
    queryKey: ["product-metrics"],
    initialData: {
      totalProducts: 0,
      totalProductsThisMonth: 0,
      totalActiveProducts: 0,
    },
    queryFn: async () => {
      return await HttpProductApi.getProductMetrics();
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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total products</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.totalProducts}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data.totalProductsThisMonth > 0 ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <ArrowRight className="size-4" />
              )}
              {data.totalProducts > 0
                ? `${Math.round((data.totalProductsThisMonth / data.totalProducts) * 100)}%`
                : "0%"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            New products added this month <IconTrendingUp className="size-4" />
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active products</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.totalActiveProducts}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Activity />
              {data.totalProducts > 0
                ? `${Math.round((data.totalActiveProducts / data.totalProducts) * 100)}%`
                : "0%"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Products available for sale</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Under stock</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <ArrowDown />
              20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Under 20% of maximun existence</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Out of stock</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Package />0
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Existence is 0 <AlertTriangle className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Indicators;
