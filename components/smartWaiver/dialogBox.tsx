"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { getWaiverById } from "@/data/page";
import { useState } from "react";

export function SmartWaiverDialog({ id }: { id: string }) {
  const [waiver, setWaiver] = useState<SingleWaiver | null>(null);

  const fetchWaiverInfo = async (id: string) => {
    const { data: waiverData } = await getWaiverById(id, true);
    const wv = waiverData.waiver as SingleWaiver;
    console.log(wv);
    setWaiver(wv);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => fetchWaiverInfo(id)}> View </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {waiver?.firstName} {waiver?.lastName}
          </DialogTitle>
          <DialogDescription className="flex gap-4 w-full">
            <span>{waiver?.email}</span>
          </DialogDescription>
        </DialogHeader>
        <div></div>

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
