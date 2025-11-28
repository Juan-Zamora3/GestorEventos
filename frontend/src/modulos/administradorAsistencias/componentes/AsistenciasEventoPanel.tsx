import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

type Filtro = "todas" | "presentes" | "faltas" | "retardos";

interface RegistroAsistencia {
  nombre: string;
  rol: string;
  equipo: string;
  sesion: string;
  hora: string;
  estado: "PRESENTE" | "RETARDO" | "FALTA";
}

const registrosMock: RegistroAsistencia[] = [
  {
    nombre: "Ana López",
    rol: "Participante",
    equipo: "RoboJunior 01",
    sesion: "Ronda 1",
    hora: "09:05",
    estado: "PRESENTE",
  },
  {
    nombre: "Carlos Martínez",
    rol: "Asesor",
    equipo: "Bits & Bots",
    sesion: "Ronda 1",
    hora: "09:12",
    estado: "RETARDO",
  },
  {
    nombre: "Luis Pérez",
    rol: "Participante",
    equipo: "MechaTech",
    sesion: "Ronda 1",
    hora: "—",
    estado: "FALTA",
  },
];

const pillEstadoClase: Record<RegistroAsistencia["estado"], string> = {
  PRESENTE:
    "inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-600 px-3 py-1 text-xs font-medium",
  RETARDO:
    "inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-600 px-3 py-1 text-xs font-medium",
  FALTA:
    "inline-flex items-center gap-2 rounded-full bg-rose-50 text-rose-600 px-3 py-1 text-xs font-medium",
};

const pillEstadoTexto: Record<RegistroAsistencia["estado"], string> = {
  PRESENTE: "Presente",
  RETARDO: "Retardo",
  FALTA: "Falta",
};

const AsistenciasEventoPanel: React.FC = () => {
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const filtrados = registrosMock.filter((r) => {
    if (filtro === "todas") return true;
    if (filtro === "presentes") return r.estado === "PRESENTE";
    if (filtro === "faltas") return r.estado === "FALTA";
    if (filtro === "retardos") return r.estado === "RETARDO";
    return true;
  });

  return (
    <div className="bg-white rounded-3xl shadow-sm px-8 py-6 flex flex-col h-full">
      {/* Barra superior: buscador + botones + sesión actual */}
      <div className="flex items-center justify-between mb-5 gap-4">
        <div className="flex-1 max-w-xl bg-[#F5F6FB] rounded-full flex items-center px-4 py-2 text-sm text-slate-700">
          <FiSearch className="text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="flex-1 bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-5 py-2.5 rounded-full bg-[#F2F3FB] text-sm font-semibold text-slate-700"
          >
            Eliminar
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5B4AE5] to-[#7B5CFF] text-sm font-semibold text-white shadow-sm"
          >
            Agregar rapido
          </button>
        </div>
      </div>

      {/* Filtros de estado + sesión actual */}
      <div className="bg-[#F5F6FB] rounded-3xl px-6 py-4 flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {[
            { id: "todas", label: "Todas" },
            { id: "presentes", label: "Presentes" },
            { id: "faltas", label: "Faltas" },
            { id: "retardos", label: "Retardos" },
          ].map((f) => {
            const active = filtro === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltro(f.id as Filtro)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-600">
          Sesión actual:{" "}
          <span className="font-semibold text-slate-800">Ronda 1</span>
        </p>
      </div>

      {/* Tabla de participantes */}
      <div className="flex-1 border border-slate-100 rounded-3xl overflow-hidden text-xs bg-white">
        <table className="w-full">
          <thead className="bg-[#F5F6FB] text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Nombre Completo</th>
              <th className="px-4 py-3 text-left">Rol</th>
              <th className="px-4 py-3 text-left">Equipo</th>
              <th className="px-4 py-3 text-left">Sesión</th>
              <th className="px-4 py-3 text-left">Hora</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[11px]">
            {filtrados.map((r) => (
              <tr key={r.nombre}>
                <td className="px-4 py-3">{r.nombre}</td>
                <td className="px-4 py-3">{r.rol}</td>
                <td className="px-4 py-3">{r.equipo}</td>
                <td className="px-4 py-3">{r.sesion}</td>
                <td className="px-4 py-3">{r.hora}</td>
                <td className="px-4 py-3">
                  <span className={pillEstadoClase[r.estado]}>
                    <span className="h-2 w-2 rounded-full bg-current opacity-70" />
                    {pillEstadoTexto[r.estado]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">⋮</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AsistenciasEventoPanel;
