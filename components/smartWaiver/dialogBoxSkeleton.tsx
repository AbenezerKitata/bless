import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
const DialogBoxSkeleton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Skeleton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Skeleton />
          </DialogTitle>
          <DialogDescription className="flex gap-4 w-full">
            <Skeleton />
          </DialogDescription>
        </DialogHeader>
        <Skeleton />
        <DialogFooter>
          <Skeleton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBoxSkeleton;
