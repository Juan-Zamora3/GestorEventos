// src/modulos/administradorAsistencias/paginas/PaginaDetalleEventoAdminAsistencias.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import InfoEventoPanel from "../componentes/InfoEventoPanel";
import EquiposEventoPanel from "../componentes/EquiposEventoPanel";
import AsistenciasEventoPanel from "../componentes/AsistenciasEventoPanel";

type Tab = "informacion" | "equipos" | "asistencias";

const TABS: { id: Tab; label: string }[] = [
  { id: "informacion", label: "Información" },
  { id: "equipos", label: "Equipos" },
  { id: "asistencias", label: "Asistencias" },
];

const PaginaDetalleEventoAdminAsistencias: React.FC = () => {
  const [tab, setTab] = useState<Tab>("informacion");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const tituloEvento =
    id === "concurso-robotica" ? "Concurso De Robótica Junior" : "Evento";

  return (
    <div className="min-h-screen w-full bg-[#EEF0F7] flex flex-col">
      {/* ================= HEADER ================= */}
      <header className="w-full">
        {/* Barra superior con degradado y título centrado */}
        <div className="bg-gradient-to-r from-[#4559B2] to-[#6D7FD6] text-white px-8 py-3 flex items-center">
          <button
            type="button"
            onClick={() => navigate("/admin-asistencias")}
            className="h-9 w-9 mr-4 rounded-full bg-white/15 flex items-center justify-center text-lg hover:bg-white/25 transition"
          >
            ←
          </button>

          <h1 className="flex-1 text-center text-[18px] font-semibold tracking-wide">
            {tituloEvento}
          </h1>

          {/* espacio para balancear el botón de regreso */}
          <div className="w-9" />
        </div>

        {/* Barra de pestañas, fondo gris clarito */}
        <div className="bg-[#E5E7F2]">
          <div className="px-10">
            <div className="flex gap-10">
              {TABS.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`py-3 text-sm font-semibold border-b-4 transition-colors ${
                      active
                        ? "border-[#8C7BFF] text-[#263159]"
                        : "border-transparent text-[#7E85A5] hover:text-[#263159]"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ================= CONTENIDO ================= */}
      <main className="flex-1 px-10 py-8">
        {tab === "informacion" && <InfoEventoPanel />}
        {tab === "equipos" && <EquiposEventoPanel />}
        {tab === "asistencias" && <AsistenciasEventoPanel />}
      </main>
    </div>
  );
};

export default PaginaDetalleEventoAdminAsistencias;
