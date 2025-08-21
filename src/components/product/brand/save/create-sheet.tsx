"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import SaveBrandForm from "./form";

const CreateBrandSheet = () => {
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
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-xl relative">
          <Button
            variant={"ghost"}
            onClick={() => setOpen(false)}
            className="p-2 absolute top-2 right-2"
          >
            <X />
          </Button>
          <SheetHeader className="px-0">
            <SheetTitle>Create New Brand</SheetTitle>
          </SheetHeader>
          <div className="w-full">
            <SaveBrandForm toggleSheet={() => setOpen((current) => !current)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateBrandSheet;
