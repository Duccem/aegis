import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/contexts/shared/ui/components/shadcn/sheet";

import { Primitives } from "@/contexts/shared/domain/primitives";
import { LayoutList, X } from "lucide-react";
import { Category } from "../../../domain/category";
import SaveCategoryForm from "./form";

const EditCategorySheet = ({
  data,
  isOpen,
  setIsOpen,
}: {
  data: Primitives<Category> | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none no-scroll">
        <div className="bg-background p-6 border border-sidebar h-full flex flex-col flex-1 overflow-y-auto no-scroll space-y-5 rounded-xl relative">
          <Button
            variant={"ghost"}
            onClick={() => setIsOpen(false)}
            className="p-2 absolute top-2 right-2"
          >
            <X />
          </Button>
          <SheetHeader className="flex flex-row items-center justify-between py-0">
            <div className="flex items-center gap-4">
              <LayoutList className="size-8" />
              <SheetTitle>
                <p>{data?.name ?? ""}</p>
              </SheetTitle>
            </div>
          </SheetHeader>
          <div className="w-full">
            <SaveCategoryForm category={data} toggleSheet={() => setIsOpen(false)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditCategorySheet;
