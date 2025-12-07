import React, { useMemo, useState } from "react";
import TablaHistorialAdmin from "../componentes/TablaHistorialAdmin";
import type { EntradaHistorial } from "../componentes/tiposAdminGeneral";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const historialDummy: EntradaHistorial[] = [
  {
    id: 1,
    nombre: "Daniel",
    rol: "Administradores de Asistencias",
    evento: "Concurso de robótica Junior",
    accion: 'Se agregó equipo "Los Trataleritos"',
    fecha: "26/11/2024",
    hora: "16:40",
  },
  {
    id: 2,
    nombre: "Sofía",
    rol: "Administradores de Eventos",
    evento: "Concurso de robótica Junior",
    accion: "Se generaron 30 constancias por correo",
    fecha: "26/11/2024",
    hora: "16:45",
  },
];

export const PaginaHistorialAdminGeneral: React.FC = () => {
  const [query, setQuery] = useState("");
  const [menuFiltrosOpen, setMenuFiltrosOpen] = useState(false);
  const [filtroRol, setFiltroRol] = useState("");
  const [filtroEvento, setFiltroEvento] = useState("");
  const [filtroAccion, setFiltroAccion] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  const opcionesRol = useMemo(() => {
    return Array.from(new Set(historialDummy.map((h) => h.rol)));
  }, []);
  const opcionesEvento = useMemo(() => {
    return Array.from(new Set(historialDummy.map((h) => h.evento)));
  }, []);
  const opcionesAccion = useMemo(() => {
    return Array.from(new Set(historialDummy.map((h) => h.accion)));
  }, []);
  const opcionesFecha = useMemo(() => {
    return Array.from(new Set(historialDummy.map((h) => h.fecha)));
  }, []);

  const entradasFiltradas = useMemo(() => {
    const q = query.trim().toLowerCase();
    return historialDummy.filter((h) => {
      const globalStr = `${h.nombre} ${h.rol} ${h.evento} ${h.accion} ${h.fecha} ${h.hora}`.toLowerCase();

      const pasaBusqueda = q ? globalStr.includes(q) : true;
      const pasaRol = filtroRol ? h.rol === filtroRol : true;
      const pasaEvento = filtroEvento ? h.evento === filtroEvento : true;
      const pasaAccion = filtroAccion ? h.accion === filtroAccion : true;
      const pasaFecha = filtroFecha ? h.fecha === filtroFecha : true;

      return pasaBusqueda && pasaRol && pasaEvento && pasaAccion && pasaFecha;
    });
  }, [query, filtroRol, filtroEvento, filtroAccion, filtroFecha]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold text-slate-800 mb-4">Historial de acciones</h1>

      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm flex-1 min-w-[320px]">
          <FiSearch className="text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en todos los campos"
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuFiltrosOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full bg-white text-slate-700 text-sm font-semibold px-4 py-2 shadow-sm hover:bg-slate-100"
          >
            Filtros
            <FiChevronDown className="text-slate-400" />
          </button>

          {menuFiltrosOpen && (
            <div className="absolute right-0 mt-2 w-96 rounded-2xl border border-slate-200 bg-white shadow-md p-4 z-20">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-600">Rol</span>
                  <select
                    value={filtroRol}
                    onChange={(e) => setFiltroRol(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Todos</option>
                    {opcionesRol.map((rol) => (
                      <option key={rol} value={rol}>{rol}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-600">Evento asignado</span>
                  <select
                    value={filtroEvento}
                    onChange={(e) => setFiltroEvento(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Todos</option>
                    {opcionesEvento.map((ev) => (
                      <option key={ev} value={ev}>{ev}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-600">Acción</span>
                  <select
                    value={filtroAccion}
                    onChange={(e) => setFiltroAccion(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Todas</option>
                    {opcionesAccion.map((ac) => (
                      <option key={ac} value={ac}>{ac}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-600">Fecha</span>
                  <select
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Todas</option>
                    {opcionesFecha.map((fe) => (
                      <option key={fe} value={fe}>{fe}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFiltroRol("");
                    setFiltroEvento("");
                    setFiltroAccion("");
                    setFiltroFecha("");
                  }}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  onClick={() => setMenuFiltrosOpen(false)}
                  className="px-4 py-2 rounded-full bg-[#6581D6] text-white text-xs font-semibold hover:bg-[#5268bf]"
                >
                  Aplicar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <TablaHistorialAdmin entradas={entradasFiltradas} />
    </div>
  );
};
