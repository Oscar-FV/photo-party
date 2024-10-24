import React from "react";
import Navbar from "../../../common/atoms/nav/nav";
import AnimatedGradientText from "../../../common/atoms/animatedGradientText/AnimatedGradientText";

export default function PartyLayout({ children }) {
  return (
    <>
      <div className="min-h-[100dvh] mb-16">
        <h1 className="text-4xl font-semibold text-primary-500 px-2 pt-5">Fuze Halloween Party</h1>
        {children}
        <Navbar />
      </div>
    </>
  );
}
