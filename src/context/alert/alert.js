"use client";
import React, { useState, createContext } from "react";

const AlertContext = createContext();

function AlertProvider({ children }) {
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const alert = {
    showAlert,
    setShowAlert,
  };

  return (
    <AlertContext.Provider value={alert}>{children}</AlertContext.Provider>
  );
}

export { AlertProvider, AlertContext };