"use client"
import React from "react";
import { Button } from "../../../../common/atoms/button/Button";

const QuestsPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 mt-5 px-4">
        <div className="relative h-full min-w-full max-w-full min-h-48 max-h-48">
          <div className="absolute -inset-0.5 bg-primary-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 "></div>
          <div className="relative bg-primary-500 h-full grid grid-rows-[auto_1fr_auto] rounded-lg p-2">
            <h3 className="font-bold">Nombre de la misión</h3>
            <p className="text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
            <Button color="neutral" variant="outline" size={"sm"}>
              Completar la misión
            </Button>
            <Button color="neutral" variant="outline" size={"sm"} className={"mt-2"}>
              Ver galeria de la misión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestsPage;
