import CreateBrandSheet from "@/contexts/catalogue/brand/ui/components/save/create-sheet";
import Brands from "@/contexts/catalogue/brand/ui/components/table";
import { Hexagon } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col h-screen p-6 gap-8">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Hexagon className="size-8" />
          <div>
            <h2 className="text-2xl font-bold ">Brands</h2>
            <p className="text-sm text-muted-foreground">Manage and review your item brands here</p>
          </div>
        </div>
        <CreateBrandSheet />
      </div>
      <Brands />
    </div>
  );
};

export default Page;
