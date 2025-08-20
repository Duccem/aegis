import CreateNewProduct from "@/components/product/create";
import Indicators from "@/components/product/indicators";
import Products from "@/components/product/table";
import { Package } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col h-screen p-6 gap-8">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Package className="size-8" />
          <div>
            <h2 className="text-2xl font-bold ">Items</h2>
            <p className="text-sm text-muted-foreground">Manage and review your products here</p>
          </div>
        </div>
        <CreateNewProduct />
      </div>
      <Indicators />
      <Products />
    </div>
  );
};

export default Page;
