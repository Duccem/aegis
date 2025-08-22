import CreateNewItem from "@/contexts/catalogue/item/ui/components/create";
import Indicators from "@/contexts/catalogue/item/ui/components/indicators";
import Items from "@/contexts/catalogue/item/ui/components/table";
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
        <CreateNewItem />
      </div>
      <Indicators />
      <Items />
    </div>
  );
};

export default Page;
