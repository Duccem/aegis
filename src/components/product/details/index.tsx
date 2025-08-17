import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Product } from "@/lib/core/product/domain/product";
import { Primitives } from "@/lib/types/primitives";
import { Package, X } from "lucide-react";

// TODO - Add product details content

const ProductDetails = ({
  data,
  isOpen,
  setIsOpen,
}: {
  data: Primitives<Product> | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-xl">
          <SheetHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Package className="size-8" />
              <SheetTitle>{data?.name}</SheetTitle>
            </div>
            <Button variant={"ghost"} onClick={() => setIsOpen(false)} className="p-2">
              <X />
            </Button>
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductDetails;
