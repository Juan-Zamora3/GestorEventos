// src/modulos/administradorEventos/componentes/TarjetaPlantillaEvento.tsx
import React from "react";
import type { PlantillaEvento } from "../tiposAdminEventos";

interface Props {
  plantilla: PlantillaEvento;
  onClick?: () => void;
  size?: "normal" | "large";
}

const TarjetaPlantillaEvento: React.FC<Props> = ({ plantilla, onClick, size = "normal" }) => {
  const sizeClasses =
    size === "large"
      ? "w-[234px] h-[162px]"
      : "w-[207px] h-[135px]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${sizeClasses}
        rounded-[28px]
        overflow-hidden
        bg-white
        border-[3px] border-white
        transition
        flex
        snap-start
      `}
      style={{ padding: 0 }}
    >
      <img
        src={plantilla.imagen}
        alt={plantilla.titulo}
        className="w-full h-full object-cover"
      />
    </button>
  );
};

export default TarjetaPlantillaEvento;
