import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/core/product/domain/product";
import { Primitives } from "@/lib/types/primitives";
import { BarChart3, Eye, Heart, PieChart, ShoppingCart, TrendingUp, Users } from "lucide-react";

export function ProductAnalytics({ product }: { product: Primitives<Product> }) {
  // Mock analytics data
  const analytics = {
    sales: {
      thisMonth: 145,
      lastMonth: 128,
      thisYear: 1680,
      lastYear: 1420,
    },
    revenue: {
      thisMonth: 2900,
      lastMonth: 2560,
      thisYear: 33600,
      lastYear: 28400,
    },
    views: {
      thisMonth: 2340,
      lastMonth: 2100,
      uniqueViews: 1890,
    },
    conversion: {
      rate: 6.2,
      lastMonth: 6.1,
    },
  };

  const salesGrowth = (
    ((analytics.sales.thisMonth - analytics.sales.lastMonth) / analytics.sales.lastMonth) *
    100
  ).toFixed(1);
  const revenueGrowth = (
    ((analytics.revenue.thisMonth - analytics.revenue.lastMonth) / analytics.revenue.lastMonth) *
    100
  ).toFixed(1);
  const yearlyGrowth = (
    ((analytics.sales.thisYear - analytics.sales.lastYear) / analytics.sales.lastYear) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Sales</p>
                <p className="text-2xl font-bold text-foreground">{analytics.sales.thisMonth}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-chart-4" />
                  <span className="text-xs text-chart-4">+{salesGrowth}%</span>
                </div>
              </div>
              <ShoppingCart className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-foreground">
                  ${analytics.revenue.thisMonth.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-chart-4" />
                  <span className="text-xs text-chart-4">+{revenueGrowth}%</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Product Views</p>
                <p className="text-2xl font-bold text-foreground">
                  {analytics.views.thisMonth.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {analytics.views.uniqueViews} unique
                </p>
              </div>
              <Eye className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold text-foreground">{analytics.conversion.rate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-chart-4" />
                  <span className="text-xs text-chart-4">+0.1%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">This Month</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{analytics.sales.thisMonth} units</span>
                  <Badge variant="secondary" className="bg-chart-4/20 text-chart-4">
                    +{salesGrowth}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Last Month</span>
                <span className="font-semibold">{analytics.sales.lastMonth} units</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">This Year</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{analytics.sales.thisYear} units</span>
                  <Badge variant="secondary" className="bg-chart-4/20 text-chart-4">
                    +{yearlyGrowth}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Last Year</span>
                <span className="font-semibold">{analytics.sales.lastYear} units</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">This Month</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    ${analytics.revenue.thisMonth.toLocaleString()}
                  </span>
                  <Badge variant="secondary" className="bg-chart-4/20 text-chart-4">
                    +{revenueGrowth}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Last Month</span>
                <span className="font-semibold">
                  ${analytics.revenue.lastMonth.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">This Year</span>
                <span className="font-semibold">
                  ${analytics.revenue.thisYear.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Last Year</span>
                <span className="font-semibold">
                  ${analytics.revenue.lastYear.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Sales trend chart</p>
                <p className="text-sm">Monthly sales over time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="h-12 w-12 mx-auto mb-2" />
                <p>Sales distribution chart</p>
                <p className="text-sm">Online vs Store sales</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-chart-4/10 rounded-lg border border-chart-4/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-chart-4" />
                <h4 className="font-semibold text-chart-4">Strong Performance</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Sales are up {salesGrowth}% this month compared to last month. The product is
                performing well in the Technology category with consistent demand.
              </p>
            </div>

            <div className="p-4 bg-chart-1/10 rounded-lg border border-chart-1/20">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-chart-1" />
                <h4 className="font-semibold text-chart-1">Customer Engagement</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                High view-to-purchase conversion rate of {analytics.conversion.rate}%. Customer
                interest remains strong with {analytics.views.uniqueViews} unique views this month.
              </p>
            </div>

            <div className="p-4 bg-chart-3/10 rounded-lg border border-chart-3/20">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-chart-3" />
                <h4 className="font-semibold text-chart-3">Seasonal Trends</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Technology products typically see increased demand in Q1. Consider inventory
                planning for the upcoming quarter.
              </p>
            </div>

            <div className="p-4 bg-chart-2/10 rounded-lg border border-chart-2/20">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-chart-2" />
                <h4 className="font-semibold text-chart-2">Recommendations</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on current trends, consider expanding marketing efforts and potentially
                introducing complementary products in the same category.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
