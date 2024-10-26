import React from "react";
import Image from "next/image";
import {APIURL} from "../../../utils/constants"

const GalleryItem = ({ imgSrc, imgCaption, onClick }) => {
  console.log(APIURL + imgSrc)
  return (
    <div class="aspect-square relative">
      <Image
        src={`${APIURL}${imgSrc}`}
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
