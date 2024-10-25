import React from "react";
import Image from "next/image";

const GalleryItem = ({ imgSrc, imgCaption, onClick }) => {
  return (
    <div class="aspect-square relative">
      <Image
        src={imgSrc}
        layout="fill"
        objectFit="cover"
        alt={imgCaption}
        className="border-[0.6px] border-neutral-900"
        onClick={onClick}
      />
    </div>
  );
};

export default GalleryItem;
