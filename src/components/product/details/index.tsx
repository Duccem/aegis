import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Product } from "@/lib/core/product/domain/product";
import { Primitives } from "@/lib/types/primitives";
import { DollarSign, Package, Pencil, TrendingUp, X } from "lucide-react";
import ImageView from "./image-view";

const ProductDetails = ({
  data,
  isOpen,
  setIsOpen,
}: {
  data: Primitives<Product> | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  if (!data) {
    return null;
  }
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none no-scroll">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-xl">
          <SheetHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Package className="size-8" />
              <SheetTitle>
                {data?.name} - {data.sku}
              </SheetTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={"ghost"} className="p-2">
                <Pencil className="size-5" />
              </Button>
              <Button variant={"ghost"} onClick={() => setIsOpen(false)} className="p-2">
                <X />
              </Button>
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="font-semibold text-lg mb-4">AI Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Demand Forecast</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Analysis of future trends.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Price Optimization</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Suggestions for best pricing.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <Separator />
            <div className="w-[70%] mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {data.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <ImageView image={image} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <Separator />

            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-sm text-muted-foreground">{data.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Price</h3>
                <p className="text-sm text-muted-foreground">${data.price.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-semibold">Cost</h3>
                <p className="text-sm text-muted-foreground">${data.cost.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {data.brand && (
                <div>
                  <h3 className="font-semibold">Brand</h3>
                  <p className="text-sm text-muted-foreground">{data.brand.name}</p>
                </div>
              )}

              {data.unit && (
                <div>
                  <h3 className="font-semibold">Unit</h3>
                  <p className="text-sm text-muted-foreground">
                    {data.unit.name} ({data.unit.abbreviation})
                  </p>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold">Categories</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.categories.map((category) => (
                  <Badge key={category.id} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground">Created At</h3>
                <p>{new Date(data.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Last Updated</h3>
                <p>{new Date(data.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>

            <Separator />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductDetails;
