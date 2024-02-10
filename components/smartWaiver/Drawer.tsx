"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getWaiverById } from "@/data/page";
import { useState } from "react";

export function SmartWaiverDrawer({ id }: { id: string }) {
  const [waiver, setWaiver] = useState<SingleWaiver | null>(null);

  const fetchWaiverInfo = async (id: string) => {
    const { data: waiverData } = await getWaiverById(id);
    const wv = waiverData.waiver as SingleWaiver;
    console.log(wv);
    setWaiver(wv);
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button onClick={() => fetchWaiverInfo(id)}> View </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {waiver?.firstName} {waiver?.lastName}
            </DrawerTitle>
            <DrawerDescription className="flex gap-4 w-full">
              <span>{waiver?.email}</span>
            </DrawerDescription>
          </DrawerHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="col-span-1">
              <span className="text-sm font-medium">Waiver ID:</span>
              <span className="text-sm">{waiver?.waiverId}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Template ID:</span>
              <span className="text-sm">{waiver?.templateId}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Title:</span>
              <span className="text-sm">{waiver?.title}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Created On:</span>
              <span className="text-sm">{waiver?.createdOn}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Expired:</span>
              <span className="text-sm">{waiver?.expired ? "✅" : "❌"}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Verified:</span>
              <span className="text-sm">{waiver?.verified ? "✅" : "❌"}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Kiosk:</span>
              <span className="text-sm">{waiver?.kiosk ? "✅" : "❌"}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">First Name:</span>
              <span className="text-sm">{waiver?.firstName}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Middle Name:</span>
              <span className="text-sm">{waiver?.middleName}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Last Name:</span>
              <span className="text-sm">{waiver?.lastName}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Date of Birth:</span>
              <span className="text-sm">{waiver?.dob}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Is Minor:</span>
              <span className="text-sm">{waiver?.isMinor ? "✅" : "❌"}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Auto Tag:</span>
              <span className="text-sm">{waiver?.autoTag}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Tags:</span>
              <span className="text-sm">{waiver?.tags?.join(", ")}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Email:</span>
              <span className="text-sm">{waiver?.email}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Marketing Allowed:</span>
              <span className="text-sm">
                {waiver?.marketingAllowed ? "✅" : "❌"}
              </span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">
                Marketing Allowed Checkbox:
              </span>
              <span className="text-sm">
                {waiver?.marketingAllowedCheckbox ? "✅" : "❌"}
              </span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Client IP:</span>
              <span className="text-sm">{waiver?.clientIP}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-medium">Typed Signatures:</span>
              <span className="text-sm">
                Participants:{" "}
                {waiver?.typedSignatures?.participants?.join(", ")}
              </span>
              <span className="text-sm">
                Guardian: {waiver?.typedSignatures?.guardian?.join(", ")}
              </span>
              <span className="text-sm">
                Body Signatures:{" "}
                {waiver?.typedSignatures?.bodySignatures?.join(", ")}
              </span>
              <span className="text-sm">
                Body Initials:{" "}
                {waiver?.typedSignatures?.bodyInitials?.join(", ")}
              </span>
            </div>
          </div>
          <DrawerFooter>
            {/* <Button type="submit">Save changes</Button> */}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
