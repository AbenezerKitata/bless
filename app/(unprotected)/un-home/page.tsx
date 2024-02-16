import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import React from "react";
import UnprotectedHomeHeader from "../components/header";
import Link from "next/link";

const UnprotectedHomePage = () => {
  const session = auth();
  return (
    <div>
      {!session.userId && (
        <div className="flex flex-col gap-2 justify-center m-5">
          <UnprotectedHomeHeader />
          <div className="flex justify-between mr-5">
            <div>
              <Link href={"/sign-in"}>
                <Button variant="default">I&apos;m a member</Button>
              </Link>
            </div>

            <div>
              <Link href={"/sign-up"}>
                <Button variant="default"> Join me!</Button>
              </Link>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default UnprotectedHomePage;
