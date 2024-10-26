import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../atoms/button/Button";

const QuestCard = ({
  id,
  title,
  description,
  color = "primary-500",
  img = "ghost",
  isCompleted,
  className = "min-h-[224px] h-[224px] max-h-[224px] min-w-[288px] w-[288px] max-w-[288px]",
}) => {
  const router = useRouter();
  const colorClass = `bg-${color}`;
  const imgSrc = `/${img}.png`;

  return (
    <div
      className={`relative grid grid-rows-[auto_1fr_auto] ${colorClass} rounded-[16px] px-8 py-3 ${className}`}
    >
      <div className="flex  justify-between">
        <h3 className="grow font-semibold text-xl text-base-100 leading-none">{title}</h3>
        {isCompleted && (
          <span className="badge badge-success text-xs">Completado</span>
        )}
      </div>
      <p className="text-xs text-base-100 mt-1">{description}</p>
      <span className="max-w-[130px]">
        {!isCompleted && (
          <Button
            color="neutral"
            size={"sm"}
            className="text-white w-[130px] h-[35px] text-xs border border-base-100"
            onClick={() => {
              router.push(`/guests/quests/complete/${id}`);
            }}
          >
            Completar misión
          </Button>
        )}
        <Button
          color="neutral"
          size={"sm"}
          className="border border-base-100 bg-white text-base-100 mt-1 w-[130px] text-xs"
          onClick={() => {
            router.push(`/guests/quests/${id}/${isCompleted}`);
          }}
        >
          Ver galería
        </Button>
      </span>
      <div className="w-full h-full">
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

export default QuestCard;
