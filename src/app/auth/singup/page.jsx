"use client";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import * as Yup from "yup";
import { Button } from "../../../common/atoms/button/Button";
import Input from "../../../common/atoms/forms/Input";
import PasswordInput from "../../../common/atoms/forms/PasswordInput";
import FormWrapper from "../../../common/atoms/forms/formWrapper/FormWrapper";
import { useAlert } from "../../../hooks/useAlert/useAlert";
import { useFetch } from "../../../hooks/useFetch/useFetch";
import { register } from "../../../features/auth/infraestructure/Login.repositories";

const SignIn = () => {
  const { setShowAlert } = useAlert();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [, setRegister, isRegistering] = useFetch({
    functionFetch: register,
    fetchInit: false,
  });

  useEffect(() => {
    if (status == "authenticated") {
      redirect("/guests/countdown");
    }
  }, [status, router]);

  const handdleSignUp = async (values) => {
    setIsSubmitting(true);
    const registerResponse = await setRegister({
      params: { email: values?.username, password: values?.password },
    });
    if (!registerResponse.ok) {
      setIsSubmitting(false)
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
    const result = await signIn("credentials", {
      redirect: false,
      redirectTo: "/guests/countdown",
      email: values?.username,
      password: values?.password,
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
          <Input
            name={"username"}
            placeholder={"Ingresa un nombre de usuario"}
          />
          <PasswordInput
            name={"password"}
            placeholder={"Ingresa tu contraseña"}
          />
          <PasswordInput
            name={"confirmpassword"}
            placeholder={"Confirma tu contraseña"}
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

export default SignIn;
