"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/contexts/shared/ui/components/shadcn/dialog";

const ImageView = ({ image }: { image: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img src={image} className="rounded-lg object-cover  mx-auto cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="w-7xl h-7xl">
        <DialogTitle className="hidden"></DialogTitle>
        <img src={image} alt="" />
      </DialogContent>
    </Dialog>
  );
};

export default ImageView;
