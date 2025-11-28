import React from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type EstadoEvento = "EN_CURSO" | "PROXIMO" | "FINALIZADO";

interface EventoAsignado {
  id: string;
  nombre: string;
  fecha: string;
  lugar: string;
  estado: EstadoEvento;
}

const eventosMock: EventoAsignado[] = [
  {
    id: "concurso-robotica",
    nombre: "Concurso de Robótica Junior",
    fecha: "12/08/2026 - 20/08/2026",
    lugar: "ITSPP - Área de Robótica",
    estado: "EN_CURSO",
  },
  {
    id: "foro-innovacion",
    nombre: "Foro de Innovación Tecnológica",
    fecha: "05/09/2026",
    lugar: "Auditorio ITSPP",
    estado: "PROXIMO",
  },
  {
    id: "curso-python",
    nombre: "Curso de Python para Ingeniería",
    fecha: "15/07/2026 - 30/07/2026",
    lugar: "Laboratorio de Cómputo 2",
    estado: "FINALIZADO",
  },
];

const badgeClasePorEstado: Record<EstadoEvento, string> = {
  EN_CURSO:
    "bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium",
  PROXIMO:
    "bg-sky-50 text-sky-600 border border-sky-100 flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium",
  FINALIZADO:
    "bg-slate-50 text-slate-500 border border-slate-200 flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium",
};

const textoPorEstado: Record<EstadoEvento, string> = {
  EN_CURSO: "En curso",
  PROXIMO: "Próximo",
  FINALIZADO: "Finalizado",
};

const PaginaListaEventosAdminAsistencias: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-[#F1F3FA] px-16 py-10">
      {/* Título + subtítulo */}
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold text-slate-900">
          Eventos asignados
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Selecciona un evento para administrar la asistencia, equipos y
          reportes.
        </p>
      </div>

      {/* Fila de buscador + filtro estado */}
      <div className="flex items-center justify-between mb-6 gap-4">
        {/* Buscador */}
        <div className="flex-1 max-w-md bg-white rounded-full shadow-sm flex items-center px-4 py-2 text-sm text-slate-700">
          <FiSearch className="text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar evento"
            className="flex-1 bg-transparent outline-none"
          />
        </div>

        {/* Filtro Estado */}
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-white rounded-full shadow-sm px-5 py-2 text-sm text-slate-700"
        >
          <span>Estado</span>
          <FiChevronDown className="text-slate-400" />
        </button>
      </div>

      {/* Lista de eventos (tarjetas largas) */}
      <div className="space-y-4">
        {eventosMock.map((evento) => (
          <button
            key={evento.id}
            type="button"
            onClick={() =>
              navigate(`/admin-asistencias/eventos/${evento.id}`)
            }
            className="w-full bg-white rounded-3xl shadow-sm px-8 py-5 flex items-center justify-between text-left hover:shadow-md transition"
          >
            <div>
              <p className="text-[15px] font-semibold text-slate-900 mb-1">
                {evento.nombre}
              </p>
              <p className="text-sm text-slate-600">{evento.fecha}</p>
              <p className="text-sm text-slate-500 mt-1">{evento.lugar}</p>
            </div>

            <div className="flex items-center">
              <div className={badgeClasePorEstado[evento.estado]}>
                <span className="h-2.5 w-2.5 rounded-full bg-current opacity-70" />
                <span>{textoPorEstado[evento.estado]}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginaListaEventosAdminAsistencias;
