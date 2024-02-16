"use client";

import React, { useState, useEffect } from "react";

const ProtectedHeader = () => {
  const [headerSize, setHeaderSize] = useState("text-6xl");

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderSize((prevSize) => {
        if (prevSize === "text-5xl") {
          clearInterval(interval);
          return prevSize;
        } else {
          // Decrease the size by one step
          const sizes = ["text-6xl", "text-5xl"];
          const currentIndex = sizes.indexOf(prevSize);
          return sizes[currentIndex + 1];
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className=" ml-5 ">
      <h1 className={` font-bold transition-all duration-3000 ${headerSize}`}>
        Welcome to Abenezer&apos;s Playground
      </h1>
    </div>
  );
};

export default ProtectedHeader;
