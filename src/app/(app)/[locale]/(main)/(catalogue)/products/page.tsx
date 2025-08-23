import CreateNewItem from "@/contexts/catalogue/item/ui/components/create";
import Indicators from "@/contexts/catalogue/item/ui/components/indicators";
import ItemsStats from "@/contexts/catalogue/item/ui/components/stats";
import Items from "@/contexts/catalogue/item/ui/components/table";
import { Package } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between w-full border-b px-6 py-3">
        <div className="flex items-center space-x-2">
          <Package className="size-8" />
          <div>
            <h2 className="text-2xl font-bold ">Items</h2>
            <p className="text-sm text-muted-foreground">Manage and review your products here</p>
          </div>
        </div>
        <CreateNewItem />
      </div>
      <Indicators />
      <ItemsStats />
      <div className="w-full">
        <Items />
      </div>
    </div>
  );
};

export default Page;
