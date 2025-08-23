import { Primitives } from "@/contexts/shared/domain/primitives";
import { Badge } from "@/contexts/shared/ui/components/shadcn/badge";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/ui/components/shadcn/card";
import { AlertTriangle, Calendar, MapPin, Minus, Package, Plus } from "lucide-react";
import { Item } from "../../../domain/item";
import { Unit } from "../../../domain/unit";

export function ItemInventory({
  item,
  units,
}: {
  item: Primitives<Item>;
  units: Primitives<Unit>[];
}) {
  // Mock inventory data
  const inventoryLocations = [
    {
      id: 1,
      location: "Main Warehouse",
      quantity: 120,
      reserved: 15,
      available: 105,
      lastUpdated: "2025-01-15",
      status: "good",
    },
    {
      id: 2,
      location: "Store A",
      quantity: 25,
      reserved: 5,
      available: 20,
      lastUpdated: "2025-01-14",
      status: "low",
    },
    {
      id: 3,
      location: "Store B",
      quantity: 5,
      reserved: 0,
      available: 5,
      lastUpdated: "2025-01-13",
      status: "critical",
    },
  ];

  const totalQuantity = inventoryLocations.reduce((sum, loc) => sum + loc.quantity, 0);
  const totalReserved = inventoryLocations.reduce((sum, loc) => sum + loc.reserved, 0);
  const totalAvailable = inventoryLocations.reduce((sum, loc) => sum + loc.available, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-emerald-500 text-white";
      case "low":
        return "bg-yellow-500 text-white";
      case "critical":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return <Package className="h-3 w-3" />;
    }
  };

  const unit = units.find((u) => u.id === item?.unitId) || { abbreviation: "N/A" };

  return (
    <div className="space-y-6">
      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Stock</p>
                <p className="text-2xl font-bold text-foreground">{totalQuantity}</p>
                <p className="text-xs text-muted-foreground">{unit?.abbreviation}</p>
              </div>
              <Package className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reserved</p>
                <p className="text-2xl font-bold text-foreground">{totalReserved}</p>
                <p className="text-xs text-muted-foreground">{unit?.abbreviation}</p>
              </div>
              <Minus className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-foreground">{totalAvailable}</p>
                <p className="text-xs text-muted-foreground">{unit?.abbreviation}</p>
              </div>
              <Plus className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory by Location */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Inventory by Location</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryLocations.map((location) => (
              <div
                key={location.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{location.location}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Updated: {location.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-semibold">
                      {location.quantity} {unit?.abbreviation}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {location.available} available • {location.reserved} reserved
                    </p>
                  </div>

                  <Badge className={getStatusColor(location.status)}>
                    {getStatusIcon(location.status)}
                    <span className="ml-1 capitalize">{location.status}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stock Movements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Stock Movements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                type: "in",
                quantity: 50,
                location: "Main Warehouse",
                date: "2025-01-15",
                reason: "Purchase Order #PO-001",
              },
              {
                type: "out",
                quantity: 25,
                location: "Store A",
                date: "2025-01-14",
                reason: "Sale #SO-123",
              },
              {
                type: "transfer",
                quantity: 10,
                location: "Store A → Store B",
                date: "2025-01-13",
                reason: "Stock Transfer",
              },
              {
                type: "out",
                quantity: 15,
                location: "Main Warehouse",
                date: "2025-01-12",
                reason: "Sale #SO-122",
              },
            ].map((movement, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1 rounded-full ${
                      movement.type === "in"
                        ? "bg-emerald-400/60 text-primary-foreground"
                        : movement.type === "out"
                          ? "bg-red-400/60 text-primary-foreground"
                          : "bg-blue-400/60 text-primary-foreground"
                    }`}
                  >
                    {movement.type === "in" ? (
                      <Plus className="h-3 w-3" />
                    ) : movement.type === "out" ? (
                      <Minus className="h-3 w-3" />
                    ) : (
                      <Package className="h-3 w-3" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {movement.type === "in" ? "+" : movement.type === "out" ? "-" : ""}
                      {movement.quantity} {unit?.abbreviation}
                    </p>
                    <p className="text-sm text-muted-foreground">{movement.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{movement.location}</p>
                  <p className="text-xs text-muted-foreground">{movement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
