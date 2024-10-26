import React from "react";
import Navbar from "../../common/atoms/nav/nav";
import AnimatedGradientText from "../../common/atoms/animatedGradientText/AnimatedGradientText";

export default function MainLayout({ children }) {
  return (
    <>
      <div className="min-h-[100dvh]">
        {children}
        <Navbar />
      </div>
    </>
  );
}
