import React from "react";
import Image from "next/image";
import { Button } from "../../atoms/button/Button";

const QuestCard = ({
  color = "primary-500",
  img = "ghost",
  className = "h-[187px] max-h-[187px] min-w-[288px] w-[288px] max-w-[288px]",
}) => {
  const colorClass = `bg-${color}`;
  const imgSrc = `/${img}.png`;

  return (
    <div
      className={`relative grid grid-rows-[auto_1fr_auto] ${colorClass} rounded-[16px] px-8 py-3 ${className}`}
    >
      <h3 className="font-semibold text-xl text-base-100">Título</h3>
      <p className="text-xs text-base-100">
        Lorem ipsum dolor sit amet consectetur. Diam praesent felis lorem
        curabitur curabitur massa enim.
      </p>
      <span className="max-w-[130px]">
        <Button
          color="neutral"
          size={"sm"}
          className={
            "text-white w-[130px] h-[35px] text-xs border border-base-100"
          }
        >
          Completar misión
        </Button>
        <Button
          color="neutral"
          size={"sm"}
          className={
            "border border-base-100 bg-white text-base-100 mt-1 w-[130px] text-xs"
          }
        >
          Ver galería
        </Button>
      </span>
      <div className="w-full h-full ">
        <Image
          src={imgSrc}
          width={85}
          height={85}
          alt="photo-party logo"
          priority={true}
          className="absolute bottom-3 right-5"
        />
      </div>
    </div>
  );
};

export default QuestCard
