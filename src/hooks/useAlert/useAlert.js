import React, { useContext } from "react";
import { AlertContext } from "../../context/alert/alert";

export const useAlert = () => {
  return useContext(AlertContext);
};