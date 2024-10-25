"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "../../../../../common/atoms/button/Button";
import { Icon } from "@iconify/react";

const CompleteQuestsPage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [caption, setCaption] = useState("");
  const inputFileRef = useRef(null);

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImageSrc(event.target.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  return (
    <div className="grid grid-rows-[1fr_auto] max-h-[75svh]">
      {!imageSrc ? (
        <>
          <div className="flex flex-col justify-center items-center mx-2">
            <p className="mb-1 text-xl font-medium text-center">
              Completa la misión tomando una foto.
            </p>
            <p className="mb-2 text-center text-accent-400 ">
              (Las fotos en vertical se ven mejor 😉)
            </p>
            <Button color="secondary" width="wide" onClick={handleButtonClick}>
              {" "}
              Tomar foto{" "}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="aspect-square relative">
            <Image
              src={imageSrc}
              layout="fill"
              objectFit="cover"
              alt={"Foto capturada"}
            />
            <span className="flex absolute w-full justify-center bottom-0 mb-4">
              <Button
                color="accent"
                className={""}
                size={"sm"}
                disabled={!imageSrc}
                onClick={handleButtonClick}
              >
                <Icon icon="mdi:camera-retake-outline" width="24" height="24" />
                Tomar otra foto
              </Button>
            </span>
          </div>
        </>
      )}
      <div className="m-2 flex flex-col">
        <textarea
          className="textarea textarea-bordered w-full grow"
          placeholder="Cuentanos algo sobre este momento 🥳📷"
          disabled={!imageSrc}
        ></textarea>
        <Button
          color="primary"
          width="wide"
          className={"w-full my-2"}
          size={"sm"}
          disabled={!imageSrc}
        >
          Completar misión
        </Button>
      </div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        hidden
        ref={inputFileRef}
      />
    </div>
  );
};
export default CompleteQuestsPage;
