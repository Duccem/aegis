import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/core/product/domain/product";
import { Primitives } from "@/lib/types/primitives";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  DollarSign,
  ExternalLink,
  HandCoins,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

const priceInLists = [
  { list: "Retail", price: 20.0, effectiveDate: "2024-09-01" },
  { list: "Wholesale", price: 18.0, effectiveDate: "2024-09-01" },
  { list: "Bulk", price: 16.0, effectiveDate: "2024-09-01" },
  { list: "Discounted", price: 15.0, effectiveDate: "2024-09-01" },
];

const ProductPrices = ({ product: data }: { product: Primitives<Product> }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortedPriceInLists, setSortedPriceInLists] = useState(priceInLists);

  useEffect(() => {
    const sorted = [...priceInLists].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortedPriceInLists(sorted);
  }, [sortOrder]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Price</p>
                <p className="text-2xl font-bold text-foreground">
                  ${priceInLists.reduce((acc, entry) => acc + entry.price, 0) / priceInLists.length}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cost</p>
                <p className="text-2xl font-bold text-foreground">$100</p>
              </div>
              <TrendingUp className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Profit</p>
                <p className="text-2xl font-bold text-foreground">
                  $
                  {priceInLists.reduce((acc, entry) => acc + (entry.price - 10), 0) /
                    priceInLists.length}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Margin</p>
                <p className="text-2xl font-bold  text-foreground">
                  {(
                    priceInLists.reduce(
                      (acc, entry) => acc + ((entry.price - 10) / entry.price) * 100,
                      0,
                    ) / priceInLists.length
                  ).toFixed(2)}
                  %
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Price Lists</CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSortOrder("asc")}
              aria-label="Sort ascending"
              className={cn({
                "bg-chart-4 text-white": sortOrder === "asc",
                "text-muted-foreground": sortOrder !== "asc",
              })}
            >
              ↑
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSortOrder("desc")}
              aria-label="Sort descending"
              className={cn({
                "bg-chart-4 text-white": sortOrder === "desc",
                "text-muted-foreground": sortOrder !== "desc",
              })}
            >
              ↓
            </Button>
            <Button size="icon" variant="ghost" aria-label="External link">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedPriceInLists.map((entry, index) => {
              const priceChangeFromPrev = entry.price - 10;
              const margin = (((entry.price - 10) / entry.price) * 100).toFixed(1);

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 border rounded-lg `}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <HandCoins className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{entry.list}</p>
                      <p className="text-sm text-muted-foreground">{entry.effectiveDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold">${entry.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Cost: ${(10.0).toFixed(2)}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">{margin}%</p>
                      <p className="text-sm text-muted-foreground">Margin</p>
                    </div>

                    <div className="flex items-center gap-1">
                      {priceChangeFromPrev >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-chart-4" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-chart-2" />
                      )}
                      <span
                        className={`text-sm ${priceChangeFromPrev >= 0 ? "text-chart-4" : "text-chart-2"}`}
                      >
                        {priceChangeFromPrev >= 0 ? "+" : ""}${priceChangeFromPrev.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPrices;
