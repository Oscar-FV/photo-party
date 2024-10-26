import React from "react";
import AnimatedGradientText from "../../../common/atoms/animatedGradientText/AnimatedGradientText";
import Image from "next/image";

export default function PartyLayout({ children }) {
  return (
    <>
      <div className="sticky top-0 z-10 h-full w-full bg-base-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40">
        <div className="mx-2 py-4 flex gap-x-2 items-center">
          <Image
            src="/logo.png"
            width={70}
            height={70}
            alt="photo-party logo"
            priority={true}
          /> 
          <AnimatedGradientText
            className={"text-3xl font-extrabold"}
            text={"Halloween at FuzeHouse"}
          />
        </div>
      </div>
      {children}
    </>
  );
}
