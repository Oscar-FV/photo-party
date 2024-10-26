"use client";

import React, { useEffect, useState } from "react";
import { redirect, useRouter, useParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import * as Yup from "yup";
import { Button } from "../../../../common/atoms/button/Button";
import Input from "../../../../common/atoms/forms/Input";
import PasswordInput from "../../../../common/atoms/forms/PasswordInput";
import FormWrapper from "../../../../common/atoms/forms/formWrapper/FormWrapper";
import { useAlert } from "../../../../hooks/useAlert/useAlert";

const LoginPage = () => {
  const { setShowAlert } = useAlert();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { event_id } = useParams(); // Obtiene event_id desde los params

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
      email: values?.username,
      password: values?.password,
      event_id, // Pasa event_id desde params
    });

    if (result?.error) {
      if (result.status === 401) {
        setShowAlert({
          show: true,
          message:
            "Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña.",
          type: "error",
        });
      } else {
        setShowAlert({
          show: true,
          message: "Ocurrió un error. Por favor, intenta nuevamente.",
          type: "error",
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper
      initialValues={{
        username: "",
        password: "",
      }}
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
              onClick={() => {
                router.push(`/auth/signup/${event_id}`); // Usa la URL con segmentos dinámicos
              }}
            >
              ¿Aún no tienes cuenta? ¡Registrate!
            </Button>
          </div>
        </>
      )}
    </FormWrapper>
  );
};

export default LoginPage;
