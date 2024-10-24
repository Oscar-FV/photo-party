import React from "react";
import Image from "next/image";

const GalleryItem = ({ imgSrc, imgCaption }) => {
  return (
    <div class="aspect-square relative">
      <Image
        src={imgSrc}
        layout="fill"
        objectFit="cover"
        alt={imgCaption}
        className="border-[0.5px] border-neutral-900"
      />
    </div>
  );
};

export default GalleryItem;
