"use client";

import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/contexts/shared/ui/components/shadcn/sheet";
import { PlusCircle, Warehouse, X } from "lucide-react";
import { useState } from "react";
import SaveStoreForm from "./form";

const CreateStoreSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <PlusCircle />
          New
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-md relative">
          <Button
            variant={"ghost"}
            onClick={() => setOpen(false)}
            className="p-2 absolute top-2 right-2"
          >
            <X />
          </Button>
          <SheetHeader className="flex flex-row items-center justify-between py-0">
            <div className="flex items-center gap-4">
              <Warehouse className="size-8" />
              <SheetTitle>Create new store</SheetTitle>
            </div>
          </SheetHeader>
          <div className="w-full">
            <SaveStoreForm toggleSheet={() => setOpen((current) => !current)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateStoreSheet;
