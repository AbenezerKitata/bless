import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import ProtectedHeader from "./(components)/header";
import DatePickerForm from "./(components)/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { NavigationMenuDemo } from "@/components/nav-menu";

const ProtectedHomePage = () => {
  const session = auth();
  return (
    <div className="flex justify-center ">
      {session.userId && (
        <div className="flex flex-col  gap-8">
          <ProtectedHeader />
          {/* <NavigationMenuDemo /> */}
          {/* <DatePickerForm /> */}
          <div className="w-full flex justify-center hover:cursor-pointer">
            <Link href="/pro-home/create-proposal">
              <Button variant="secondary" className="p-6" size="lg">
                Create a Proposal
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProtectedHomePage;
