import React, { forwardRef } from "react";
import Image from "next/image";
import { APIURL } from "../../../utils/constants";

const GalleryItem = forwardRef(({ imgSrc, imgCaption, username, onClick }, ref) => {
  return (
    <div ref={ref} className="aspect-square relative group">
      <Image
        src={`${APIURL}${imgSrc}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="border-[0.6px] border-neutral-900 object-cover"
        alt={imgCaption || imgSrc}
        onClick={onClick}
      />
      {/* Username overlay with max width and truncate */}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm p-1 rounded max-w-[100px] truncate">
        {username}
      </div>
    </div>
  );
});

export default GalleryItem;
