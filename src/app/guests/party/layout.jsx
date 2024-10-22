import React from "react";
import Navbar from "../../../common/atoms/nav/nav";
import AnimatedGradientText from "../../../common/atoms/animatedGradientText/AnimatedGradientText";

export default function PartyLayout({ children }) {
  return (
    <>
      <div className="h-[100svh]">
        <h1 className="text-4xl font-medium text-primary-500 px-5 pt-5">Fuze Halloween Party</h1>
        {children}
        <Navbar />
      </div>
    </>
  );
}
