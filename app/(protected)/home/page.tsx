import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import ProtectedHeader from "./components/header";
import { DatePickerDemo } from "@/components/date-picker";
// import { NavigationMenuDemo } from "@/components/nav-menu";

const ProtectedHomePage = () => {
  const session = auth();
  return (
    <div className="flex justify-center">
      {session.userId && (
        <div className="flex flex-col items-center gap-4 justify-center">
          <ProtectedHeader />
          {/* <NavigationMenuDemo /> */}
          <div className="w-full flex ml-10 mt-7">
            <DatePickerDemo />
          </div>
        </div>
      )}
    </div>
  );
};

export const Protected = ({ children }: { children: React.ReactNode }) => {
  const session = auth();
  return (
    <div>
      {session.userId && (
        <div className="flex justify-end p-4">
          <UserButton />
        </div>
      )}
      {session.userId && <div>{children}</div>}
    </div>
  );
};

export default ProtectedHomePage;
