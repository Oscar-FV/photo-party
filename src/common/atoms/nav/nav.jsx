import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Navbar = () => {
  return (
    <div className="btm-nav box-content fixed bottom-0 z-10">
      <button>
        <Icon icon="lucide:home" width="24" height="24"/>
        <span className="btm-nav-label">Inicio</span>
      </button>
      <button className="active text-primary-500">
        <Icon icon="lucide:list" width="24" height="24" />
        <span className="btm-nav-label">Misiones</span>
      </button>
      <button>
      <Icon icon="ic:round-photo-library" width="24" height="24" />
        <span className="btm-nav-label">Galería</span>
      </button>
    </div>
  );
};

export default Navbar;
