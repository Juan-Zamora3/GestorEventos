import React, { useMemo, useState } from "react";
import TablaUsuariosAdmin from "../componentes/TablaUsuariosAdmin";
import type { UsuarioRow } from "../componentes/tiposAdminGeneral";
import { ModalUsuarioAdmin } from "../componentes/ModalUsuarioAdmin";
import { FiPlus, FiSearch, FiChevronDown } from "react-icons/fi";

const usuariosDummy: UsuarioRow[] = [
  {
    id: 1,
    nombre: "Sofía",
    correo: "correo@gmail.com",
    telefono: "6381006000",
    evento: "Concurso de robótica Junior",
    rol: "Administradores de Eventos",
    status: "Activo",
  },
  {
    id: 2,
    nombre: "Daniel",
    correo: "correo@gmail.com",
    telefono: "6381006000",
    evento: "Concurso de robótica Junior",
    rol: "Administradores de Asistencias",
    status: "Finalizado",
  },
];

export const PaginaUsuariosAdminGeneral: React.FC = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarios, setUsuarios] = useState<UsuarioRow[]>(usuariosDummy);
  const [query, setQuery] = useState("");
  const [menuFiltrosOpen, setMenuFiltrosOpen] = useState(false);
  const [filtroEvento, setFiltroEvento] = useState("");
  const [filtroRol, setFiltroRol] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<"" | "Activo" | "Finalizado">("");

  const opcionesEvento = useMemo(() => {
    return Array.from(new Set(usuarios.map((u) => u.evento)));
  }, [usuarios]);
  const opcionesRol = useMemo(() => {
    return Array.from(new Set(usuarios.map((u) => u.rol)));
  }, [usuarios]);
  const opcionesStatus = useMemo(() => {
    return Array.from(new Set(usuarios.map((u) => u.status)));
  }, [usuarios]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Encabezado + botones */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            Participantes
          </h1>
          <p className="text-sm text-slate-500">
            Participantes del concurso de robótica junior · 2025
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setModalAbierto(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#6581D6] text-white text-sm font-semibold px-4 py-2 shadow-sm hover:bg-[#5268bf]"
          >
            <FiPlus className="text-sm" />
            Agregar
          </button>
        </div>
      </div>

      {/* Buscador */}
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
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white shadow-md p-4 z-20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-600">Evento</span>
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
                  <span className="text-xs font-semibold text-slate-600">Status</span>
                  <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value as "" | "Activo" | "Finalizado")}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Todos</option>
                    {opcionesStatus.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setFiltroEvento(""); setFiltroRol(""); setFiltroStatus(""); }}
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

      {/* Tabla de usuarios */}
      <TablaUsuariosAdmin
        usuarios={usuarios.filter((u) => {
          const q = query.trim().toLowerCase();
          const matchQuery =
            q.length === 0 ||
            [u.nombre, u.correo, u.telefono, u.evento, u.rol, u.status]
              .map((s) => s.toLowerCase())
              .some((s) => s.includes(q));
          const matchEvento = filtroEvento.trim().length === 0 || u.evento.toLowerCase().includes(filtroEvento.trim().toLowerCase());
          const matchRol = filtroRol.trim().length === 0 || u.rol === filtroRol;
          const matchStatus = filtroStatus === "" || u.status === filtroStatus;
          return matchQuery && matchEvento && matchRol && matchStatus;
        })}
        onEditarUsuario={() => {
          setModalAbierto(true);
        }}
        onEliminarUsuario={(id) => {
          setUsuarios((prev) => prev.filter((u) => u.id !== id));
        }}
      />

      {/* Modal de añadir usuario */}
      <ModalUsuarioAdmin
        abierto={modalAbierto}
        
        onCerrar={() => setModalAbierto(false)}
      />
    </div>
  );
};
