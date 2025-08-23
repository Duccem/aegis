"use client";
import { Badge } from "@/contexts/shared/ui/components/shadcn/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/ui/components/shadcn/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/contexts/shared/ui/components/shadcn/chart";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 30 },
  { month: "February", desktop: 305, mobile: 200, tablet: 212 },
  { month: "March", desktop: 237, mobile: 120, tablet: 183 },
  { month: "April", desktop: 73, mobile: 190, tablet: 78 },
  { month: "May", desktop: 209, mobile: 130, tablet: 301 },
  { month: "June", desktop: 214, mobile: 140, tablet: 163 },
];

const chartData2 = [
  { month: "January", desktop: 30, mobile: 45, tablet: 25 },
  { month: "February", desktop: 18, mobile: 32, tablet: 50 },
  { month: "March", desktop: 30, mobile: 10, tablet: 60 },
  { month: "April", desktop: 73, mobile: 17, tablet: 10 },
  { month: "May", desktop: 10, mobile: 46, tablet: 44 },
  { month: "June", desktop: 90, mobile: 10, tablet: 0 },
  { month: "July", desktop: 30, mobile: 55, tablet: 15 },
  { month: "August", desktop: 10, mobile: 67, tablet: 23 },
  { month: "September", desktop: 8, mobile: 50, tablet: 42 },
  { month: "October", desktop: 30, mobile: 10, tablet: 60 },
  { month: "November", desktop: 20, mobile: 20, tablet: 60 },
  { month: "December", desktop: 33, mobile: 0, tablet: 66 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-purple-500)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--color-orange-500)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--color-emerald-500)",
  },
} satisfies ChartConfig;

const ItemsStats = () => {
  return (
    <div className="border-b grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
      <div className="col-span-3 border-r">
        <Card className="border-none bg-transparent ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Item Views</CardTitle>
              <CardDescription>
                Track how many views your items have received over the past six months.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-purple-500/10 text-purple-500 border-0">
                <span className="inline-block w-2 h-2 mr-1 rounded-full bg-purple-500"></span>
                Desktop
              </Badge>
              <Badge className="bg-orange-500/10 text-orange-500 border-0">
                <span className="inline-block w-2 h-2 mr-1 rounded-full bg-orange-500"></span>Mobile
              </Badge>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-0">
                <span className="inline-block w-2 h-2 mr-1 rounded-full bg-green-500"></span>Tablet
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-52 w-full">
              <LineChart
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => value.slice(0, 3)}
                  padding={"no-gap"}
                />
                <YAxis
                  dataKey={"desktop"}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={1}
                  height={1}
                  orientation="right"
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                  dataKey="desktop"
                  type="monotone"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="mobile"
                  type="monotone"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="tablet"
                  type="monotone"
                  stroke="var(--color-tablet)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="border-none bg-transparent col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Items Orders</CardTitle>
            <CardDescription>Overview of item orders over the past six months.</CardDescription>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-purple-500/10 text-purple-500 border-0">
              <span className="inline-block w-2 h-2 mr-1 rounded-full bg-purple-500"></span>
              Desktop
            </Badge>
            <Badge className="bg-orange-500/10 text-orange-500 border-0">
              <span className="inline-block w-2 h-2 mr-1 rounded-full bg-orange-500"></span>Mobile
            </Badge>
            <Badge className="bg-emerald-500/10 text-emerald-500 border-0">
              <span className="inline-block w-2 h-2 mr-1 rounded-full bg-green-500"></span>Tablet
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-52 w-full">
            <BarChart accessibilityLayer data={chartData2}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="desktop"
                stackId="a"
                fill="var(--color-purple-500)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="mobile"
                stackId="a"
                fill="var(--color-orange-500)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="tablet"
                stackId="a"
                fill="var(--color-emerald-500)"
                radius={[0, 0, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemsStats;
