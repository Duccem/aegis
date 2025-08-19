import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/core/product/domain/product";
import { Primitives } from "@/lib/types/primitives";
import { Building2, Clock, DollarSign, Mail, Phone, Plus, Star, Truck } from "lucide-react";

export function ProductSuppliers({ product }: { product: Primitives<Product> }) {
  // Mock suppliers data
  const suppliers = [
    {
      id: 1,
      name: "TechSupply Co.",
      email: "orders@techsupply.com",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
      price: 9.5,
      leadTime: "5-7 days",
      minOrder: 100,
      status: "active",
      lastOrder: "2025-01-10",
      totalOrders: 24,
      onTimeDelivery: 95,
    },
    {
      id: 2,
      name: "Global Electronics",
      email: "sales@globalelec.com",
      phone: "+1 (555) 987-6543",
      rating: 4.5,
      price: 10.25,
      leadTime: "3-5 days",
      minOrder: 50,
      status: "active",
      lastOrder: "2025-01-05",
      totalOrders: 18,
      onTimeDelivery: 88,
    },
    {
      id: 3,
      name: "Budget Components",
      email: "info@budgetcomp.com",
      phone: "+1 (555) 456-7890",
      rating: 3.9,
      price: 8.75,
      leadTime: "10-14 days",
      minOrder: 200,
      status: "inactive",
      lastOrder: "2024-12-15",
      totalOrders: 12,
      onTimeDelivery: 78,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-4 text-white";
      case "inactive":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-chart-4";
    if (rating >= 4.0) return "text-chart-3";
    return "text-chart-2";
  };

  return (
    <div className="space-y-6">
      {/* Suppliers Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Suppliers</p>
                <p className="text-2xl font-bold text-foreground">{suppliers.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Suppliers</p>
                <p className="text-2xl font-bold text-foreground">
                  {suppliers.filter((s) => s.status === "active").length}
                </p>
              </div>
              <Star className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Best Price</p>
                <p className="text-2xl font-bold text-foreground">
                  ${Math.min(...suppliers.map((s) => s.price)).toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Lead Time</p>
                <p className="text-2xl font-bold text-foreground">6 days</p>
              </div>
              <Truck className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suppliers List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Supplier Details</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{supplier.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{supplier.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{supplier.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(supplier.status)}>{supplier.status}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className={`h-4 w-4 ${getRatingColor(supplier.rating)}`} />
                      <span className="font-medium">{supplier.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Unit Price</p>
                    <p className="text-lg font-bold text-foreground">${supplier.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Lead Time</p>
                    <p className="font-semibold">{supplier.leadTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Min. Order</p>
                    <p className="font-semibold">
                      {supplier.minOrder} {product.unit?.abbreviation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">On-Time Delivery</p>
                    <p className="font-semibold">{supplier.onTimeDelivery}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Last order: {supplier.lastOrder}</span>
                    </div>
                    <span>•</span>
                    <span>{supplier.totalOrders} total orders</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                    <Button size="sm">Create PO</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
