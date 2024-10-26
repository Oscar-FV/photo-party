import React from "react";
import Image from "next/image";
import GalleryItem from "../../atoms/galleryItem/GalleryItem";
import Dialog from "../../atoms/dialog/Dialog";

const Gallery = ({ items }) => {
  return (
    <>
      <div className="mb-5 grid grid-cols-3">
        <GalleryItem
          imgSrc={"https://picsum.photos/3024/4032"}
          imgCaption={"hola-mundo"}
          onClick={() => document.getElementById("gallery_dialog").showModal()}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem><GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem><GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem><GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
        <GalleryItem
          imgSrc={"https://picsum.photos/800/600"}
          imgCaption={"hola-mundo"}
        ></GalleryItem>
      </div>
      <Dialog id={"gallery_dialog"}>
          <Image
            src={"https://picsum.photos/3024/4032"}
            layout="fill"
            objectFit="cover"
            alt={"aa"}
            className="border-[0.6px] border-neutral-900"
          />
      </Dialog>
    </>
  );
};

export default Gallery;
