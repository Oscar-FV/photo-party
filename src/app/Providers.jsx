"use client";
import {Alert} from "../common/atoms/alert/Alert";
import { AlertProvider } from "../context/alert/alert";
// import { UserProvider } from "@/context/user";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }) => {
  return (
    <SessionProvider>
        <AlertProvider>
          <Alert />
          {children}
        </AlertProvider>
    </SessionProvider>
  );
};
