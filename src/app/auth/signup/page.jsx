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
import { useFetch } from "../../../hooks/useFetch/useFetch";
import { register } from "../../../features/auth/infraestructure/Login.repositories";
import Image from "next/image";

const SignUpComponent = () => {
  const { setShowAlert } = useAlert();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const event_id = searchParams.get("event_id");

  const [, setRegister, isRegistering] = useFetch({
    functionFetch: register,
    fetchInit: false,
  });

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/guests/countdown");
    }
  }, [status]);

  const handdleSignUp = async (values) => {
    setIsSubmitting(true);
    const registerResponse = await setRegister({
      params: { email: values.username, password: values.password },
    });

    if (!registerResponse.ok) {
      setIsSubmitting(false);
      const errorData = await registerResponse.json();
      setShowAlert({
        show: true,
        message: errorData.detail,
        type: "error",
      });
    } else {
      handdleLogin(values);
    }
    setIsSubmitting(false);
  };

  const handdleLogin = async (values) => {
    await signIn("credentials", {
      redirect: false,
      redirectTo: "/guests/countdown",
      email: values.username,
      password: values.password,
      event_id: event_id,
    });
  };

  return (
    <FormWrapper
      initialValues={{
        username: "",
        password: "",
        confirmpassword: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string().required("Este campo es obligatorio."),
        password: Yup.string()
          .min(8, "La contraseña debe tener al menos 8 caracteres.")
          .matches(
            /[A-Z]/,
            "La contraseña debe tener al menos una letra mayúscula."
          )
          .matches(/[0-9]/, "La contraseña debe tener al menos un número.")
          .required("Este campo es obligatorio."),
        confirmpassword: Yup.string()
          .oneOf(
            [Yup.ref("password"), null],
            "Las contraseñas deben coincidir."
          )
          .required("Por favor confirma tu contraseña."),
      })}
      onSubmit={handdleSignUp}
      className="flex flex-col gap-y-3 mt-10"
    >
      {({ isValid }) => (
        <>
          <Input name="username" placeholder="Ingresa un nombre de usuario" />
          <PasswordInput name="password" placeholder="Ingresa tu contraseña" />
          <PasswordInput
            name="confirmpassword"
            placeholder="Confirma tu contraseña"
          />
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
          </div>
        </>
      )}
    </FormWrapper>
  );
};

const SignIn = () => (
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
    <SignUpComponent />
  </Suspense>
);

export default SignIn;
