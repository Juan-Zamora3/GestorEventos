// src/modulos/administradorEventos/paginas/PaginaListaEventosAdminEventos.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiChevronDown,
  FiGrid,
  FiList,
  FiArrowDown,
} from "react-icons/fi";
import FilaPlantillasRapidas from "../componentes/FilaPlantillasRapidas";
import GridEventosAdminEventos from "../componentes/GridEventosAdminEventos";
import type { EventoCardAdminEventos } from "../componentes/tiposAdminEventos";

const eventosMock: EventoCardAdminEventos[] = [
  {
    id: "1",
    titulo: "Concurso de Robotica Junior",
    imagen: "/login-campus.png",
    fechaInicio: "12/08/2026",
    fechaFin: "20/08/2026",
    equipos: "5 Equipos",
    personas: "20 personas",
    activo: true,
  },
  {
    id: "2",
    titulo: "Concurso de Robotica Junior",
    imagen: "/Cursos.png",
    fechaInicio: "12/08/2026",
    fechaFin: "20/08/2026",
    equipos: "5 Equipos",
    personas: "20 personas",
    activo: true,
  },
  {
    id: "3",
    titulo: "Concurso de Robotica Junior",
    imagen: "/Concurso.png",
    fechaInicio: "12/08/2026",
    fechaFin: "20/08/2026",
    equipos: "5 Equipos",
    personas: "20 personas",
    activo: true,
  },
];

export const PaginaListaEventosAdminEventos: React.FC = () => {
  const [animDown, setAnimDown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const initialAnimateUp = Boolean((location.state as { animateUp?: boolean } | null)?.animateUp);
  const [showList, setShowList] = useState<boolean>(!initialAnimateUp);
  const [showHeader, setShowHeader] = useState<boolean>(!initialAnimateUp);
  useEffect(() => {
    const animateUp = Boolean((location.state as { animateUp?: boolean } | null)?.animateUp);
    if (animateUp) {
      const t1 = window.setTimeout(() => setShowHeader(true), 160);
      const t2 = window.setTimeout(() => setShowList(true), 200);
      return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
    }
  }, [location.state]);
  const irGaleriaConTransicion = () => {
    setAnimDown(true);
    window.setTimeout(() => {
      navigate("/admin-eventos/plantillas");
    }, 650);
  };
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#192D69] to-[#6581D6]">
      {/* ZONA AZUL — título + plantillas (nada de barra blanca aquí) */}
      <section className="bg-transparent px-14 pt-10 pb-10 text-white">
        <div className={`transform-gpu transition-all ${showHeader ? "duration-[1100ms] ease-in-out translate-y-0 opacity-100" : "duration-[1100ms] ease-in-out -translate-y-12 opacity-0"}`}>
          <h1 className="text-4xl font-bold mb-8">Crear Evento</h1>
          <div className="flex justify-end w-full">
            <FilaPlantillasRapidas size="large" onMasClick={irGaleriaConTransicion} />
          </div>
        </div>
      </section>

      <div className={`transform-gpu transition-all ${animDown ? "duration-700 ease-in-out translate-y-28 opacity-100" : showList ? "duration-[1100ms] ease-in-out translate-y-0 opacity-100" : "duration-[1100ms] ease-in-out translate-y-16 opacity-0"}`}>
        <div className="bg-[#EEF0F7] rounded-t-none">
          {/* BARRA BLANCA DE BUSCADOR en zona gris, tocando el borde azul */}
          <section className="px-14 -mt-6">
            <div className="bg-white w-full rounded-full px-6 py-3 shadow-sm flex items-center gap-4">
              {/* Buscador */}
              <div className="flex items-center gap-3 flex-1">
                <FiSearch className="text-slate-400 text-lg" />
                <input
                  type="text"
                  placeholder="Buscar evento"
                  className="flex-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Tipo */}
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-1.5 rounded-full"
              >
                <span>Tipo</span>
                <FiChevronDown className="text-slate-400" />
              </button>

              {/* Estado */}
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-1.5 rounded-full"
              >
                <span>Estado</span>
                <FiChevronDown className="text-slate-400" />
              </button>

              {/* Botones de vista y orden */}
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                  <FiGrid />
                </button>
                <button className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <FiList />
                </button>
                <button className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                  <FiArrowDown />
                </button>
              </div>
            </div>
          </section>

          {/* GRID DE EVENTOS */}
          <section className="px-14 pt-6 pb-8">
            <div className="bg-white rounded-3xl shadow-sm px-6 py-4">
              <GridEventosAdminEventos eventos={eventosMock} stagger={initialAnimateUp} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
