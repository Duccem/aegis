import CreateCategorySheet from "@/components/product/category/save/create-sheet";
import Categories from "@/components/product/category/table";
import { LayoutList } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col h-screen p-6 gap-8">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <LayoutList className="size-8" />
          <div>
            <h2 className="text-2xl font-bold ">Categories</h2>
            <p className="text-sm text-muted-foreground">
              Manage and review your item categories here
            </p>
          </div>
        </div>
        <CreateCategorySheet />
      </div>
      <Categories />
    </div>
  );
};

export default Page;
