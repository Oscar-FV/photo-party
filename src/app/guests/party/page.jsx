"use client";
import React from "react";
import { Button } from "../../../common/atoms/button/Button";
import Gallery from "../../../common/molecules/gallery/Gallery";
import GalleryItem from "../../../common/atoms/galleryItem/GalleryItem";

const PartyPage = () => {
  return (
    <>
      <div className="mt-5">
        <h2 className="mt-5 font-medium text-lg pl-2"> Misiones </h2>
        <div className="flex gap-x-6 overflow-x-auto py-4 min-h-48 max-h-48 pl-2 -mt-4">
          <div className="min-w-72 max-w-72 bg-primary-500 rounded-[16px] px-10 py-4">
            <h3 className="font-semibold text-xl">Título</h3>
            <h3 className="text-xs">
              Lorem ipsum dolor sit amet consectetur. Diam praesent felis lorem
              curabitur massa enim.{" "}
            </h3>

            <span>
              <Button color="neutral" size={"sm"}>Completar misión</Button>
              <Button color="neutral" size={"sm"} className={"border border-base-100 bg-white text-base-100"}>Completar misión</Button>
            </span>
          </div>
        </div>
      </div>

      <h2 className="mt-5 font-medium text-lg pl-2"> Tu galería </h2>
      <Gallery></Gallery>
    </>
  );
};

export default PartyPage;
