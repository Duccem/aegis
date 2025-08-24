import { Warehouse } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between w-full border-b pb-4 px-6">
        <div className="flex items-center space-x-2">
          <Warehouse className="size-8" />
          <div>
            <h2 className="text-2xl font-bold ">Stores</h2>
            <p className="text-sm text-muted-foreground">Manage and review your item stores here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
