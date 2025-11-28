// src/modulos/administradorAsistencias/componentes/GridEventosAsistencias.tsx
import React from "react";
import TarjetaEventoAsistencia from "./TarjetaEventoAsistencia";
import type { EventoResumen } from "./tiposAdminAsistencias";

interface Props {
  eventos: EventoResumen[];
  onClickEvento: (id: string) => void;
}

const GridEventosAsistencias: React.FC<Props> = ({
  eventos,
  onClickEvento,
}) => {
  return (
    <section className="px-14 pt-6 pb-10">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {eventos.map((evento) => (
          <TarjetaEventoAsistencia
            key={evento.id}
            evento={evento}
            onClick={() => onClickEvento(evento.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default GridEventosAsistencias;
