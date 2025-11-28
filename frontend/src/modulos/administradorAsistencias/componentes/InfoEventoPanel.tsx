// src/modulos/administradorAsistencias/componentes/InfoEventoPanel.tsx
import React from "react";

const InfoEventoPanel: React.FC = () => {
  return (
    <div className="flex gap-8">
      {/* COLUMNA IZQUIERDA: tarjeta grande con info general */}
      <section className="flex-1 bg-white rounded-3xl shadow-sm px-10 py-8">
        <h2 className="text-lg font-semibold text-[#1E2852] mb-8">
          Información general
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-20 text-sm">
          {/* Nombre del evento */}
          <div>
            <p className="text-xs font-semibold text-[#8A8FA8] mb-1">
              Nombre del evento
            </p>
            <p className="text-[15px] font-semibold text-[#1F2A46]">
              Concurso de Robótica Junior
            </p>
          </div>

          {/* Tipo */}
          <div>
            <p className="text-xs font-semibold text-[#8A8FA8] mb-1">Tipo</p>
            <p className="text-[15px] font-semibold text-[#1F2A46]">
              Concurso
            </p>
          </div>

          {/* Fecha del evento */}
          <div>
            <p className="text-xs font-semibold text-[#8A8FA8] mb-1">
              Fecha del evento
            </p>
            <p className="text-[15px] font-semibold text-[#1F2A46]">
              12/08/2026 - 20/08/2026
            </p>
          </div>

          {/* Sede */}
          <div>
            <p className="text-xs font-semibold text-[#8A8FA8] mb-1">Sede</p>
            <p className="text-[15px] font-semibold text-[#1F2A46]">
              ITSPP - Área de Robótica
            </p>
          </div>

          {/* Responsable de asistencias */}
          <div>
            <p className="text-xs font-semibold text-[#8A8FA8] mb-1">
              Responsable de asistencias
            </p>
            <p className="text-[15px] font-semibold text-[#1F2A46]">
              Juan Enrique Zamora German
            </p>
          </div>

          {/* Modalidad */}
          <div>
            <p className="text-xs font-semibold text-[#8A8FA8] mb-1">
              Modalidad
            </p>
            <p className="text-[15px] font-semibold text-[#1F2A46]">
              Presencial
            </p>
          </div>
        </div>

        {/* Descripción */}
        <div className="mt-10">
          <p className="text-xs font-semibold text-[#8A8FA8] mb-2">
            Descripción
          </p>
          <p className="text-sm leading-relaxed text-[#303952] max-w-3xl">
            Evento enfocado a promover el desarrollo de habilidades en robótica
            móvil en estudiantes de nivel superior. Incluye rondas
            eliminatorias, finales y espacios de demostración para proyectos
            especiales.
          </p>
        </div>
      </section>

      {/* COLUMNA DERECHA: métricas (tres tarjetas) */}
      <aside className="w-80 flex flex-col gap-5">
        <div className="bg-white rounded-3xl shadow-sm px-6 py-5">
          <p className="text-xs font-semibold text-[#8A8FA8] mb-1">
            Equipos registrados
          </p>
          <p className="text-3xl font-semibold text-[#1F2A46]">12</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm px-6 py-5">
          <p className="text-xs font-semibold text-[#8A8FA8] mb-1">
            Participantes totales
          </p>
          <p className="text-3xl font-semibold text-[#1F2A46]">48</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm px-6 py-5">
          <p className="text-xs font-semibold text-[#8A8FA8] mb-1">
            Sesiones de asistencia
          </p>
          <p className="text-3xl font-semibold text-[#1F2A46]">4</p>
        </div>
      </aside>
    </div>
  );
};

export default InfoEventoPanel;
