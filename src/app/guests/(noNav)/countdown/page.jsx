"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { useFetch } from "../../../../hooks/useFetch/useFetch";
import { getEventData } from "../../../../features/countdown/infraestructure/countdown.repositories";
import ConfettiExplosion from "../../../../features/countdown/infraestructure/ui/confettiExplosion/ConfettiExplossion";

const CountdownPage = () => {
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const router = useRouter();

  const [event, fetchEvent, loadingEvent] = useFetch({
    functionFetch: getEventData,
    fetchInit: false,
  });

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (session) {
      fetchEvent({ body: { token: token } });
    }
  }, [session]);

  useEffect(() => {
    if (event?.starts_at) {
      const eventStartTime = new Date(event.starts_at).getTime();
      const now = Date.now();
      const timeRemaining = Math.max((eventStartTime - now) / 1000, 0);
      setTimeLeft(timeRemaining);
    }
  }, [event]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          router.push("/guests/party"); 
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  const formatTime = () => {
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = Math.floor(timeLeft % 60);

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime();

  return (
    <>
      {loadingEvent || !session ? (
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
            Cargando la información de tu fiesta...
          </h2>
        </div>
      ) : (
        <>
          <ConfettiExplosion trigger={true} />
          <div className="h-[100svh] flex flex-col justify-between items-center p-5 gap-y-5">
            <div className="grow flex flex-col items-center justify-center gap-y-5">
              <h3 className="font-semibold text-xl text-accent-500">
                ¡La fiesta está por comenzar!
              </h3>
              <div className="items-center justify-center grid grid-flow-col gap-3 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-primary-500 rounded-box">
                  <span className="countdown text-5xl">
                    <span style={{ "--value": days }}></span>
                  </span>
                  Días
                </div>
                <div className="flex flex-col p-2 bg-primary-500 rounded-box">
                  <span className="countdown text-5xl">
                    <span style={{ "--value": hours }}></span>
                  </span>
                  Horas
                </div>
                <div className="flex flex-col p-2 bg-primary-500 rounded-box">
                  <span className="countdown text-5xl">
                    <span style={{ "--value": minutes }}></span>
                  </span>
                  Minutos
                </div>
                <div className="flex flex-col p-2 bg-primary-500 rounded-box">
                  <span className="countdown text-5xl">
                    <span style={{ "--value": seconds }}></span>
                  </span>
                  Segundos
                </div>
              </div>
              <p className="text-center">
                📸 Invita a tus amigos: ¡Compitan tomando las fotos más creativas y
                diviértanse cumpliendo retos!
              </p>
            </div>

            <div className="relative max-w-md w-full mb-5">
              <div className="absolute -inset-0.5 bg-info rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div
                role="alert"
                className="relative alert alert-info grid-cols-[auto_auto]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-start">
                  Cierra el navegador si lo necesitas y regresa cuando quieras.
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CountdownPage;
