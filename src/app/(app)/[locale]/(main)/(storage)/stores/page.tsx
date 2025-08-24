import CreateStoreSheet from "@/contexts/store/store/ui/components/save/create-sheet";
import Stores from "@/contexts/store/store/ui/components/table";
import { Warehouse } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between w-full border-b pb-4 px-6">
        <div className="flex items-center space-x-2">
          <Warehouse className="size-8" />
          <div>
            <h2 className="text-2xl font-bold ">Stores</h2>
            <p className="text-sm text-muted-foreground">Manage and review your item stores here</p>
          </div>
        </div>
        <CreateStoreSheet />
      </div>
      <Stores />
    </div>
  );
};

export default Page;
