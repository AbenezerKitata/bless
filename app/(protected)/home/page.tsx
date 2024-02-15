import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import ProtectedHeader from "./components/header";

const ProtectedHomePage = () => {
  const session = auth();
  return (
    <div>
      {session.userId && (
        <div>
          <ProtectedHeader />
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
