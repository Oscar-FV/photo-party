import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="btm-nav btm-nav-md py-2 box-content fixed bottom-0 z-10">
      <Link href={"/guests/party"} className={pathname.includes("party") ? "active text-primary-500" : ""}>
        <Icon icon="material-symbols:home" width="24" height="24"/>
        <span className="btm-nav-label">Inicio</span>
      </Link>
      <Link href={"/guests/quests"} className={pathname.includes("quests") ? "active text-primary-500" : ""}>
        <Icon icon="lucide:list" width="24" height="24" />
        <span className="btm-nav-label">Misiones</span>
      </Link>
      <Link href={"/guests/gallery"} className={pathname.includes("gallery") ? "active text-primary-500" : ""}>
      <Icon  icon="ic:round-photo-library" width="24" height="24" />
        <span className="btm-nav-label">Galería</span>
      </Link>
      <button onClick={() => signOut({callbackUrl: "/auth/login"})}>
      <Icon icon="material-symbols:logout" width="24" height="24" />
        <span className="btm-nav-label">Salir</span>
      </button>
    </div>
  );
};

export default Navbar;
