"use client";

import React from "react";
import { Button } from "./ui/button";
import { useWindowSize } from "@/hooks/use-screen-size";

const ShowWindowSize = () => {
  const windowSize = useWindowSize();

  return (
    <div className="flex gap-10">
      {" "}
      <Button size="icon">{windowSize.height}</Button>
      <Button size="icon">{windowSize.width}</Button>
    </div>
  );
};

export default ShowWindowSize;
