"use client";
import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions";

const SignOut = () => {
  return (
    <Button variant="secondary" onClick={() => logout()}>
      Sign Out
    </Button>
  );
};

export default SignOut;
