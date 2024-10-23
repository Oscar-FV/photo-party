"use client";
// import { Alert } from "@/components/common/alert/Alert";
// import { AlertProvider } from "@/context/alert";
// import { UserProvider } from "@/context/user";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }) => {
  return (
    <SessionProvider>
        {/* <AlertProvider> */}
          {/* <Alert /> */}
          {children}
        {/* </AlertProvider> */}
    </SessionProvider>
  );
};
