import React, { useRef, useCallback, useState } from "react";
import Image from "next/image";
import GalleryItem from "../../atoms/galleryItem/GalleryItem";
import Dialog from "../../atoms/dialog/Dialog";
import AnimatedGradientText from "../../atoms/animatedGradientText/AnimatedGradientText";
import { APIURL } from "../../../utils/constants";

const Gallery = ({ 
  items = [], 
  loading, 
  loadMore, 
  limit = 3, 
  noPhotosText = "Aún no has hecho ningun post", 
  showDetails = true // Nueva prop para mostrar o esconder detalles
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const observer = useRef(null);

  // Observador para el último elemento
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, loadMore]
  );

  // Manejo del click en la imagen
  const handleImageClick = (post) => {
    setSelectedImage(post);
    document.getElementById("gallery_dialog").showModal();
  };

  // Función para filtrar duplicados en el array `items`
  const uniqueItems = items.reduce((unique, item) => {
    const exists = unique.some((uItem) => uItem.id === item.id);
    return exists ? unique : [...unique, item];
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 mb-16">
        {uniqueItems.length > 0 ? (
          uniqueItems.map((item, index) => {
            const isLastItem = index === uniqueItems.length - 1;
            return (
              <GalleryItem
                ref={isLastItem ? lastItemRef : null}
                key={item.id || index}
                imgSrc={item.image_url}
                imgCaption={item.caption}
                username={item.user_name}
                onClick={() => handleImageClick(item)}
              />
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full text-center">{noPhotosText}</p>
        )}

        {loading &&
          Array.from({ length: limit }).map((_, i) => (
            <div key={`skeleton-${i}`} className="skeleton animate-pulse aspect-square bg-white opacity-15"></div>
          ))}
      </div>

      <Dialog id="gallery_dialog" className="relative w-full h-full">
        {selectedImage && (
          <>
            <Image
              src={`${APIURL}${selectedImage.image_url}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              alt={selectedImage.caption || selectedImage.image_url}
            />
            <div className="absolute top-0 left-0 w-full bg-black bg-opacity-60 p-4">
              <AnimatedGradientText className={"text-2xl font-bold"} text={selectedImage.quest_name}></AnimatedGradientText>
            </div>
            {showDetails && ( // Mostrar detalles según la prop
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-4">
                <p className="text-xl font-medium text-primary-500">Posteado por:</p>
                <AnimatedGradientText className={"text-2xl font-medium max-w-xs truncate -mt-2"} text={`@${selectedImage.user_name}`}></AnimatedGradientText>
                <p className="text-lg max-w-full text-white">{selectedImage.caption}</p>
              </div>
            )}
          </>
        )}
      </Dialog>
    </>
  );
};

export default Gallery;
