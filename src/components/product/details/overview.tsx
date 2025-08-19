import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/core/product/domain/product";
import { Primitives } from "@/lib/types/primitives";
import {
  BarChart3,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  Tag,
  TrendingUp,
} from "lucide-react";

const ProductOverview = ({ product }: { product: Primitives<Product> }) => {
  return (
    <div className="flex flex-col gap-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Status & Quick Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Stock Status</span>
                <Badge variant="default" className="bg-chart-4 text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  In Stock
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Current Stock</span>
                <span className="font-semibold">150 {product.unit?.abbreviation}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Reorder Point</span>
                <span className="font-semibold">50 {product.unit?.abbreviation}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Last Sold</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="font-semibold">2 days ago</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Monthly Trend</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-chart-4" />
                  <span className="font-semibold text-chart-4">+12%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Profit Margin</span>
                <span className="font-semibold">
                  {(((product.price - product.cost) / product.price) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total Value</span>
                <span className="font-semibold">${(150 * product.price).toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Avg. Monthly Sales
                </span>
                <span className="font-semibold">45 {product.unit?.abbreviation}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>AI Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-chart-1/10 rounded-lg border border-chart-1/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-chart-1" />
                <h4 className="font-semibold text-chart-1">Demand Forecast</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on historical data, demand is expected to increase by 15% next month. Consider
                increasing stock levels to avoid stockouts.
              </p>
            </div>

            <div className="p-4 bg-chart-3/10 rounded-lg border border-chart-3/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-chart-3" />
                <h4 className="font-semibold text-chart-3">Price Optimization</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Current pricing is competitive. Market analysis suggests you could increase price by
                5-8% without significant impact on demand.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductOverview;
