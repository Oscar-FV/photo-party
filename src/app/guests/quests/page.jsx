"use client"
import React from "react";
import { Button } from "../../../common/atoms/button/Button";

const QuestsPage = () => {
  return (
    <>
      <h2 className="text-lg font-medium ml-3 mt-5"> Misiones del evento </h2>
      <div className="grid grid-cols-1 mx-3">
        <div className="relative h-full min-w-full max-w-full min-h-52 max-h-52">
          <div className="absolute -inset-0.5 bg-secondary-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 "></div>
          <div className="relative bg-secondary-500 h-full grid grid-rows-[auto_1fr_auto] rounded-lg p-2">
            <h3 className="font-bold text-lg">Nombre de la misión</h3>
            <p className="mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
            <Button color="ghost" size={"sm"} className={"bg-base-content text-secondary-500"}>
              Completar la misión
            </Button>
            <Button color="neutral" variant="outline" size={"sm"} className={"my-2"}>
              Ver galeria de la misión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestsPage;
