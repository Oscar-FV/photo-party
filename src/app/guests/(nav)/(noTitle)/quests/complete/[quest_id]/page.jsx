"use client";
import React, { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { Button } from "../../../../../../../common/atoms/button/Button";
import FormWrapper from "../../../../../../../common/atoms/forms/formWrapper/FormWrapper";
import Textarea from "../../../../../../../common/atoms/forms/Textarea";
import { useFetch } from "../../../../../../../hooks/useFetch/useFetch";
import { savePhoto, createPost } from "../../../../../../services/posts/posts";

const CompleteQuestsPage = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const params = useParams();
  const { quest_id } = params;
  const router = useRouter();

  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const inputFileRef = useRef(null);

  const [, uploadPhoto] = useFetch({
    functionFetch: savePhoto,
    fetchInit: false,
  });
  const [, addPost] = useFetch({
    functionFetch: createPost,
    fetchInit: false,
    showAlertSuccess: "¡Misión completada!"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImageSrc(event.target.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      // Primero, subimos la imagen
      const imgResponse = await uploadPhoto({
        body: { token: token, file: imageFile },
      });

      if (imgResponse) {
        const imageUrl = imgResponse; // Asegúrate de extraer la URL de la respuesta

        // Después, creamos el post con la URL de la imagen subida
        const postResponse = await addPost({
          body: {
            token: token,
            quest_id: quest_id,
            image_url: imageUrl,
            caption: values.text,
          },
        });

        if (postResponse) {
          router.push(`/guests/quests/${quest_id}`);
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error al completar la misión:", error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="grid grid-rows-[1fr_auto] h-[75svh] max-h-[75svh]">
      {!imageSrc ? (
        <div className="flex flex-col justify-center items-center mx-2">
          <p className="mb-1 text-xl font-medium text-center">
            Completa la misión tomando una foto.
          </p>
          <p className="mb-2 text-center text-accent-400">
            (Las fotos en vertical se ven mejor 😉)
          </p>
          <Button color="secondary" width="wide" onClick={handleButtonClick}>
            Tomar foto
          </Button>
        </div>
      ) : (
        <div className="aspect-square relative max-w-screen w-full mx-auto">
          <Image
            src={imageSrc}
            layout="fill"
            objectFit="cover"
            alt={"Foto capturada"}
          />
          <span className="flex absolute w-full justify-center bottom-0 mb-4">
            <Button
              color="accent"
              size="sm"
              disabled={!imageSrc || isSubmitting}
              onClick={handleButtonClick}
            >
              <Icon icon="mdi:camera-retake-outline" width="24" height="24" />
              Tomar otra foto
            </Button>
          </span>
        </div>
      )}
      <FormWrapper
        onSubmit={handleSubmit}
        initialValues={{
          text: "",
        }}
        validationSchema={Yup.object({
          text: Yup.string().max(100, "El campo es de máximo 100 caracteres."),
        })}
        className="m-2 flex flex-col mb-24"
      >
        {({ isValid }) => (
          <>
            <Textarea
              placeholder="Cuéntanos algo sobre este momento 🥳📷"
              name={"text"}
              disabled={!imageSrc}
            />
            <Button
              type="submit"
              color="primary"
              width="wide"
              className="w-full my-2"
              size="sm"
              loading={isSubmitting}
              disabled={!imageSrc || !isValid || isSubmitting}
            >
              Completar misión
            </Button>
          </>
        )}
      </FormWrapper>
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
