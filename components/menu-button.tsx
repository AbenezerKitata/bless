import React from "react";
import { Button } from "./ui/button";
import { LuMenuSquare } from "react-icons/lu";
import { IoLogoFreebsdDevil } from "react-icons/io";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DiCoda } from "react-icons/di";

const MenuButton = () => {
  return (
    <div className="flex items-center gap-5">
      {" "}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="dark:bg-black  dark:text-white text-xl dark:hover:bg-stone-900"
          >
            <LuMenuSquare />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className=" rounded-r-3xl">
          <SheetHeader>
            <SheetTitle>
              {/* LOGO HERE */}
              <IoLogoFreebsdDevil />
            </SheetTitle>
            <SheetDescription>Some Description here ... </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-1 justify-center items-center">
            {/* Nav Links */}
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
            <div className="h-8">link</div>
          </div>

          <SheetFooter>
            {/* <SheetClose asChild>
              <Button type="submit">Close</Button>
            </SheetClose> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className=" flex items-center justify-center dark:text-white text-black text-2xl dark:bg-black rounded-full p-2">
        <DiCoda />
      </div>
    </div>
  );
};

export default MenuButton;
