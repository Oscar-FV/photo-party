"use client";
import React, { useState, useEffect } from "react";

import { useFetch } from "../../../../hooks/useFetch/useFetch";

const CountdownPage = () => {

  const [event, fetchEvent, loadingEvent] = useFetch({
    functionFetch: 
  })


  // Estado para almacenar los segundos restantes (ejemplo: 2 días)
  const [timeLeft, setTimeLeft] = useState(2 * 24 * 60 * 60); // 2 días en segundos

  // useEffect para manejar la cuenta regresiva
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000); // Actualizar cada segundo

    return () => clearInterval(interval); // Limpiar intervalo cuando el componente se desmonte
  }, []);

  // Función para convertir los segundos restantes en días, horas, minutos y segundos
  const formatTime = () => {
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime();

  return (
    <div className="h-[100svh] flex flex-col justify-between items-center p-5 gap-y-5">
      <div className="grow flex flex-col items-center justify-center gap-y-5">
        <h3 className="font-semibold text-xl text-accent-500">
          ¡La fiesta está por comenzar!
        </h3>
        <div className="items-center justify-center grid grid-flow-col gap-3 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-primary-500 rounded-box ">
            <span className="countdown text-5xl">
              <span style={{ "--value": 15 }}></span>
            </span>
            Días
          </div>
          <div className="flex flex-col p-2 bg-primary-500 rounded-box ">
            <span className="countdown text-5xl">
              <span style={{ "--value": hours }}></span>
            </span>
            Horas
          </div>
          <div className="flex flex-col p-2 bg-primary-500 rounded-box ">
            <span className="countdown text-5xl">
              <span style={{ "--value": minutes }}></span>
            </span>
            Minutos
          </div>
          <div className="flex flex-col p-2 bg-primary-500 rounded-box ">
            <span className="countdown text-5xl">
              <span style={{ "--value": seconds }}></span>
            </span>
            segundos
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
  );
};

export default CountdownPage;
