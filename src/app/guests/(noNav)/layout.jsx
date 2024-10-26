"use client"
import React from "react";

import { useSession } from "next-auth/react";

export default function MainLayout({ children }) {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="min-h-[100dvh]">
        {children}
      </div>
    </>
  );
}
