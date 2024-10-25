"use client";
import Link from "next/link";
import Image from "next/image";
import AnimatedGradientText from "../../common/atoms/animatedGradientText/AnimatedGradientText";

export default function AuthLayout({ children }) {

  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-y-2 h-[100dvh] justify-center p-5">
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/logo.png"
          width={150}
          height={150}
          alt="photo-party logo"
          priority={true}
        />
        <div className="-mt-5">
          <h3 className="text-4xl text-center">Bienvenidx a</h3>
          <AnimatedGradientText text={"Photo Party"} className={"text-center text-5xl"}/>
          <p className="text-center text-lg">
            Cumple divertidos retos en tu fiesta y captura los momentos más
            icónicos. 📸💃
          </p>
        </div>
      </div>
      {children}
      <div>
        <p className="text-center text-xs font-light text-primary-300/50">
          Photo Party - preview
        </p>
        <p className="text-center text-xs font-light text-primary-300/50">
          Made by Ttete👾
        </p>
      </div>
    </div>
  );
}
