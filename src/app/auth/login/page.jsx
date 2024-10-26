"use client";

import React, { Suspense, useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import * as Yup from "yup";
import { Button } from "../../../common/atoms/button/Button";
import Input from "../../../common/atoms/forms/Input";
import PasswordInput from "../../../common/atoms/forms/PasswordInput";
import FormWrapper from "../../../common/atoms/forms/formWrapper/FormWrapper";
import { useAlert } from "../../../hooks/useAlert/useAlert";
import Image from "next/image";

const LoginComponent = () => {
  const { setShowAlert } = useAlert();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const event_id = searchParams.get("event_id");

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/guests/countdown");
    }
  }, [status, router]);

  const handdleLogin = async (values) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      redirectTo: "/guests/countdown",
      email: values.username,
      password: values.password,
      event_id: event_id,
    });

    if (result?.error) {
      setShowAlert({
        show: true,
        message:
          result.status === 401
            ? "Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña."
            : "Ocurrió un error. Por favor, intenta nuevamente.",
        type: "error",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string().required("Este campo es obligatorio."),
        password: Yup.string().required("Este campo es obligatorio."),
      })}
      onSubmit={handdleLogin}
      className="flex flex-col gap-y-3 mt-10"
    >
      {({ isValid }) => (
        <>
          <Input name="username" placeholder="Ingresa tu nombre de usuario" />
          <PasswordInput name="password" placeholder="Ingresa tu contraseña" />
          <div className="mt-4 flex flex-col">
            <Button
              type="submit"
              color="primary"
              width="block"
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
            >
              ¡Que comience la fiesta!
            </Button>
            <Button
              color="ghost"
              width="block"
              size="xs"
              className="mt-3"
              onClick={() => router.push(`/auth/signup?event_id=${event_id}`)}
            >
              ¿Aún no tienes cuenta? ¡Registrate!
            </Button>
          </div>
        </>
      )}
    </FormWrapper>
  );
};

const LoginPage = () => (
  <Suspense
    fallback={
      <div className="flex flex-col items-center justify-center relative w-full h-[100svh]">
        <Image
          src="/logo.png"
          width={200}
          height={200}
          alt="photo-party-logo"
          priority={true}
          className={"pulsate-bck"}
        />
        <h2 className="text-xl font-semibold text-primary-500">Cargando...</h2>
      </div>
    }
  >
    <LoginComponent />
  </Suspense>
);

export default LoginPage;
