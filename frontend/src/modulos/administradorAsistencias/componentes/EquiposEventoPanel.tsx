import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ModalAgregarEquipo from "./ModalAgregarEquipo";
import ModalEquipoDetalle from "./ModalEquipoDetalle";

interface Equipo {
  id: string;
  nombre: string;
  institucion: string;
  integrantes: number;
  asesor: string;
}

const equiposMock: Equipo[] = [
  {
    id: "1",
    nombre: "Los Tralalerites",
    institucion: "Instituto tecnologico superior de puerto peñasco",
    integrantes: 4,
    asesor: "Juan Perez Gallador",
  },
  {
    id: "2",
    nombre: "Bits & Bots",
    institucion: "Instituto tecnologico superior de puerto peñasco",
    integrantes: 4,
    asesor: "Juan Perez Gallador",
  },
  {
    id: "3",
    nombre: "MechaTech",
    institucion: "Instituto tecnologico superior de puerto peñasco",
    integrantes: 4,
    asesor: "Juan Perez Gallador",
  },
  // … puedes duplicar si quieres llenar más
];

const EquiposEventoPanel: React.FC = () => {
  const [showAgregar, setShowAgregar] = useState(false);
  const [showDetalle, setShowDetalle] = useState(false);

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm px-8 py-6 flex flex-col h-full">
        {/* Buscador + botón nuevo equipo */}
        <div className="flex items-center justify-between mb-5 gap-4">
          <div className="flex-1 max-w-xl bg-[#F5F6FB] rounded-full flex items-center px-4 py-2 text-sm text-slate-700">
            <FiSearch className="text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar"
              className="flex-1 bg-transparent outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAgregar(true)}
            className="rounded-full bg-gradient-to-r from-[#5B4AE5] to-[#7B5CFF] text-white px-6 py-2.5 text-sm font-semibold shadow-sm"
          >
            Nuevo Equipo
          </button>
        </div>

        {/* Grid de tarjetas de equipos */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-auto pr-1">
          {equiposMock.map((eq) => (
            <button
              key={eq.id}
              type="button"
              onClick={() => setShowDetalle(true)}
              className="bg-white rounded-2xl shadow-[0_0_0_1px_rgba(15,23,42,0.06)] hover:shadow-md transition px-5 py-4 text-left"
            >
              <p className="text-sm font-semibold text-slate-900 mb-1">
                {eq.nombre}
              </p>
              <p className="text-[11px] text-slate-500 mb-3">
                {eq.institucion}
              </p>

              <div className="text-[11px] text-slate-600 space-y-1 mb-2">
                <p>
                  <span className="font-semibold">👥 Integrantes</span>{" "}
                  {eq.integrantes}
                </p>
                <p>
                  <span className="font-semibold">👤 Asesor</span> {eq.asesor}
                </p>
              </div>

              <button
                type="button"
                className="mt-2 text-[11px] font-semibold text-[#356BFF]"
              >
                PARTICIPANTES
              </button>
            </button>
          ))}
        </div>
      </div>

      {showAgregar && <ModalAgregarEquipo onClose={() => setShowAgregar(false)} />}
      {showDetalle && <ModalEquipoDetalle onClose={() => setShowDetalle(false)} />}
    </>
  );
};

export default EquiposEventoPanel;
