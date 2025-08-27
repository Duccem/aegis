import { StockList } from "@/contexts/store/stock/ui/components/stock-list";
import { Boxes } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between w-full border-b pb-4 px-6">
        <div className="flex items-center space-x-2">
          <Boxes className="size-8" />
          <div>
            <h2 className="text-2xl font-bold ">Stock</h2>
            <p className="text-sm text-muted-foreground">
              The existence of the product items on stores
            </p>
          </div>
        </div>
      </div>
      <StockList />
    </div>
  );
};

export default Page;
