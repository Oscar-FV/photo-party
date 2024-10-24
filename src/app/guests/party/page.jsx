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
        <div className="flex gap-x-6 overflow-x-auto py-4 min-h-48 h-48 max-h-48 pl-2 -mt-4">
          <div className="relative h-full min-w-56 max-w-56">
            <div className="absolute -inset-0.5 bg-primary-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 "></div>
            <div className="relative bg-primary-500 h-full grid grid-rows-[auto_1fr_auto] rounded-lg p-2">
              <h3 className="font-bold">Nombre de la misión</h3>
              <p className="text-sm mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
              <Button color="neutral" variant="outline" size={"sm"}>
                Completar la mision
              </Button>
            </div>
          </div>
          <div className="relative h-full  min-w-56 max-w-56">
            <div className="absolute -inset-0.5 bg-secondary-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 "></div>
          </div>
          <div className="relative h-full  min-w-56 max-w-56">
            <div className="absolute -inset-0.5 bg-accent-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 "></div>
          </div>
        </div>
      </div>

      <h2 className="mt-5 font-medium text-lg pl-2"> Tu galería </h2>
      <Gallery>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
      </Gallery>
    </>
  );
};

export default PartyPage;
