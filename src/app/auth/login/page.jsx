"use client"
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../../../common/atoms/button/Button";
import Input from "../../../common/atoms/forms/Input"
const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (status == "authenticated") {
      redirect("/guests/countdown");
    }
  }, [status, router]);

  const handdleLogin = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      redirectTo: "/guests/countdown",
      email: "ofv",
      password: "seguridad99",
    });

    // if (result?.error) {
    //   if (result.status === 401) {
    //     setShowAlert({
    //       show: true,
    //       message:
    //         "Credenciales incorrectas. Por favor, verifica tu correo y contraseña.",
    //       type: "error",
    //     });
    //   } else {
    //     setShowAlert({
    //       show: true,
    //       message: "Ocurrió un error. Por favor, intenta nuevamente.",
    //       type: "error",
    //     });
    //   }
    // }
  }


  return <div className="flex flex-col gap-y-3 mt-10">
    <Input placeholder={"Ingresa tu nombre de usuario"}/>
    <Input placeholder={"Ingresa tu contraseña"}/>

    <div className="mt-4 flex flex-col">
        <Button color="primary" width="block" onClick={handdleLogin}> ¡Que comience la fiesta! </Button>
        <Button color="ghost" width="block" size={"xs"}> ¿Aun no tienes cuenta? ¡Registrate! </Button>
    </div>
  </div>;
};

export default LoginPage;
