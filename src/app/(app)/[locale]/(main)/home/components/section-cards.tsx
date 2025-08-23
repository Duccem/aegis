import { Badge } from "@/contexts/shared/ui/components/shadcn/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/ui/components/shadcn/card";
import { ArrowDown, ArrowUp } from "lucide-react";

export function SectionCards() {
  return (
    <div className=" grid grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 border-y">
      <div className="border-r">
        <Card className="@container/card bg-background border-none">
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                <ArrowUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <div className="border-r">
        <Card className="@container/card bg-background border-none">
          <CardHeader>
            <CardDescription>New Customers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1,234
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">
                <ArrowDown />
                -20%
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <div className="border-r">
        <Card className="@container/card bg-background border-none">
          <CardHeader>
            <CardDescription>Active Accounts</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              45,678
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                <ArrowUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <Card className="@container/card bg-background border-none">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">
              <ArrowDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
