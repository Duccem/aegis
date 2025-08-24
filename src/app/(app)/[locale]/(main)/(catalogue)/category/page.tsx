import CreateCategorySheet from "@/contexts/catalogue/category/ui/components/save/create-sheet";
import Categories from "@/contexts/catalogue/category/ui/components/table";
import { LayoutList } from "lucide-react";

//TODO - Implements create sheet/form, table list and toggle status action and update sheet/form

const Page = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between w-full border-b pb-4 px-6">
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
