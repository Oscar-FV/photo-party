// src/app/guests/loading.js
import React from 'react';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center relative w-full h-[100svh]">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="photo-party-logo"
            priority={true}
            className={"pulsate-bck"}
          />
          <h2 className="text-xl font-semibold text-primary-500">
            Cargando...
          </h2>
        </div>
  );
};

export default Loading;
