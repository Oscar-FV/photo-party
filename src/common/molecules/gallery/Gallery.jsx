import React, { useRef, useCallback, useState } from "react";
import Image from "next/image";
import GalleryItem from "../../atoms/galleryItem/GalleryItem";
import Dialog from "../../atoms/dialog/Dialog";

const Gallery = ({ items=[], loading, loadMore }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const observer = useRef();

  // Referencia en el último elemento para cargar más al hacer scroll
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore(); // Cargar más elementos
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loadMore]
  );

  const handleImageClick = (post) => {
    setSelectedImage(post);
    document.getElementById("gallery_dialog").showModal();
  };

  return (
    <>
      <div className="grid grid-cols-3 mb-16">
      {loading ? (
        <>
          <div className="skeleton rounded-none aspect-square bg-gray-200"></div>
          <div className="skeleton rounded-none aspect-square bg-gray-200"></div>
          <div className="skeleton rounded-none aspect-square bg-gray-200"></div>
          <div className="skeleton rounded-none aspect-square bg-gray-200"></div>
          <div className="skeleton rounded-none aspect-square bg-gray-200"></div>
          <div className="skeleton rounded-none aspect-square bg-gray-200"></div>
          <div className="skeleton rounded-none aspect-square bg-gray-200"></div>
          <div className="skeleton rounded-none aspect-square bg-gray-200"></div>
          <div className="skeleton rounded-none aspect-square bg-gray-200"></div>
        </>
      ) : items.length > 0 ? (
        items.map((item, index) => {
          if (items.length === index + 1) {
            // Ref en el último elemento para detectar el final
            return (
              <GalleryItem
                ref={lastItemRef}
                key={index}
                imgSrc={item.imgSrc}
                imgCaption={item.imgCaption}
                onClick={() => handleImageClick(item.imgSrc)}
              />
            );
          } else {
            return (
              <GalleryItem
                key={index}
                imgSrc={item.image_url}
                imgCaption={item.caption}
                onClick={() => handleImageClick(item)}
              />
            );
          }
        })
      ) : (
        <p className="text-gray-500 col-span-full text-center">Aún no has hecho ningun post</p>
      )}
      </div>

      <Dialog id="gallery_dialog">
        {selectedImage && (
          <Image
            src={selectedImage.image_url}
            layout="fill"
            objectFit="cover"
            alt="Selected image"
            className="border-[0.6px] border-neutral-900"
          />
        )}
      </Dialog>
    </>
  );
};

export default Gallery;
