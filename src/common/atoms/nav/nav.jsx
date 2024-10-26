import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Navbar = () => {
  return (
    <div className="btm-nav btm-nav-sm py-2 box-content fixed bottom-0 z-10">
      <button>
        <Icon icon="material-symbols:home" width="24" height="24"/>
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
      <button>
      <Icon icon="material-symbols:logout" width="24" height="24" />
        <span className="btm-nav-label">Salir</span>
      </button>
    </div>
  );
};

export default Navbar;
