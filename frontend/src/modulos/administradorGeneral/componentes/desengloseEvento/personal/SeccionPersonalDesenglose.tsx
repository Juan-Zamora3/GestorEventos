import type { FC } from "react";
import { useMemo, useRef, useState } from "react";
import { FiSearch, FiMoreVertical, FiDownload } from "react-icons/fi";
import AñadirPersonal from "./AñadirPersonal";

interface Row {
  id: string;
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  roles: string[];
  correo: string;
  telefono: string;
}

const catalogoRoles = [
  "Coordinador General",
  "Edecan",
  "Gestor de constancias",
  "Maestro de ceremonias",
];

const base: Row[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `P${i + 1}`,
  nombre: ["Sofía", "Santiago", "Valentina", "Sebastián", "Isabella", "Alejandro", "Camila", "Daniel", "Lucía", "Martín", "Sofía", "Santiago"][i],
  apPaterno: ["González", "Rodríguez", "Martínez", "García", "Pérez", "Fernández", "Díaz", "Gómez", "Ruiz", "Navarro", "González", "Rodríguez"][i],
  apMaterno: ["Pérez", "López", "Hernández", "Sánchez", "Ramírez", "Torres", "Flores", "Cruz", "Morales", "Vega", "Pérez", "López"][i],
  roles: [
    ["Coordinador General"],
    ["Coordinador General"],
    ["Edecan"],
    ["Edecan"],
    ["Edecan"],
    ["Edecan"],
    ["Edecan"],
    ["Gestor de constancias"],
    ["Gestor de constancias"],
    ["Gestor de constancias"],
    ["Gestor de constancias"],
    ["Maestro de ceremonias"],
  ][i],
  correo: "correo@gmail.com",
  telefono: "6381006000",
}));

const SeccionPersonalDesenglose: FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [rows, setRows] = useState<Row[]>(base);
  const [seleccion, setSeleccion] = useState<Set<string>>(new Set());
  const [seleccionMode, setSeleccionMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [editando, setEditando] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ nombre: string; apPaterno: string; apMaterno: string; correo: string; telefono: string; roles: string[] } | null>(null);
  const [roleMenuFor, setRoleMenuFor] = useState<string | undefined>(undefined);
  const tableRef = useRef<HTMLDivElement>(null);
  const [openAdd, setOpenAdd] = useState(false);

  const filtrados = useMemo(() => {
    const term = busqueda.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) =>
      `${r.nombre} ${r.apPaterno} ${r.apMaterno}`.toLowerCase().includes(term) ||
      r.roles.join(", ").toLowerCase().includes(term) ||
      r.correo.toLowerCase().includes(term) ||
      r.telefono.toLowerCase().includes(term)
    );
  }, [busqueda, rows]);

  const toggleSelect = (id: string) => {
    setSeleccion((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const selectAll = () => {
    setSeleccion(new Set(filtrados.map((r) => r.id)));
  };
  const eliminarSeleccionados = () => {
    if (!seleccionMode || seleccion.size === 0) return;
    setRows((prev) => prev.filter((r) => !seleccion.has(r.id)));
    setSeleccion(new Set());
  };

  const iniciarEdicion = (r: Row) => {
    setEditando(r.id);
    setDraft({ nombre: r.nombre, apPaterno: r.apPaterno, apMaterno: r.apMaterno, correo: r.correo, telefono: r.telefono, roles: [...r.roles] });
    setMenuOpen(null);
  };

  const guardarEdicion = () => {
    if (!editando || !draft) return;
    const n = draft.nombre.trim();
    const ap = draft.apPaterno.trim();
    const am = draft.apMaterno.trim();
    const c = draft.correo.trim();
    const t = draft.telefono.trim();
    setRows((prev) => prev.map((r) => (
      r.id === editando
        ? { ...r, nombre: n || r.nombre, apPaterno: ap || r.apPaterno, apMaterno: am || r.apMaterno, correo: c || r.correo, telefono: t || r.telefono, roles: (draft.roles && draft.roles.length ? draft.roles : r.roles) }
        : r
    )));
    setEditando(null);
    setDraft(null);
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setDraft(null);
  };

  const toggleRole = (rowId: string, role: string) => {
    setRows((prev) => prev.map((r) => {
      if (r.id !== rowId) return r;
      const has = r.roles.includes(role);
      const roles = has ? r.roles.filter((x) => x !== role) : [...r.roles, role];
      return { ...r, roles: roles.length ? roles : [role] };
    }));
  };

  const exportCsv = () => {
    const headers = ["Nombre", "Apellido Paterno", "Apellido Materno", "Rol", "Correo", "Telefono"];
    const lines = filtrados.map((r) => [r.nombre, r.apPaterno, r.apMaterno, r.roles.join("; "), r.correo, r.telefono].join(","));
    const csv = [headers.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "personal.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <section className="px-6 sm:px-10 py-6">
      <div className="flex items-center justify-between mb-5 gap-4">
        <div className="flex-1 max-w-xl bg-[#F5F6FB] rounded-full flex items-center px-4 py-2 text-sm text-slate-700">
          <FiSearch className="text-slate-400 mr-2" />
          <input type="text" placeholder="Buscar" value={busqueda} onChange={(e)=>setBusqueda(e.target.value)} className="flex-1 bg-transparent outline-none" />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const next = !seleccionMode;
              setSeleccionMode(next);
              if (!next) setSeleccion(new Set());
            }}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold ${seleccionMode ? "bg-gradient-to-r from-[#5B4AE5] to-[#7B5CFF] text-white" : "bg-[#F2F3FB] text-slate-700"}`}
          >
            {seleccionMode ? "Salir de selección" : "Seleccionar"}
          </button>
          <button
            type="button"
            onClick={eliminarSeleccionados}
            disabled={!seleccionMode || seleccion.size === 0}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold ${!seleccionMode || seleccion.size===0 ? "bg-[#F2F3FB] text-slate-500 cursor-not-allowed" : "bg-rose-600 text-white"}`}
          >
            Eliminar
          </button>
          <button type="button" onClick={()=>setOpenAdd(true)} className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5B4AE5] to-[#7B5CFF] text-sm font-semibold text-white shadow-sm transform-gpu transition hover:brightness-110 hover:-translate-y-[1px] hover:scale-[1.02]">Añadir Personal</button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white" ref={tableRef}>
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Personal del Evento</h3>
          </div>
          <button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-700 bg-[#F5F6FB] px-3 py-1.5 rounded-full">
            <FiDownload /> Exportar a excel
          </button>
        </div>
        <div className="border-t border-slate-100">
          <div className="overflow-x-auto max-h-[540px] overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#F5F6FB] text-slate-500 sticky top-0 z-10">
                <tr>
                  {seleccionMode && (
                    <th className="px-4 py-3 text-left w-10">
                      <input
                        type="checkbox"
                        checked={seleccion.size === filtrados.length && filtrados.length>0}
                        onChange={(e)=> { if (e.target.checked) selectAll(); else setSeleccion(new Set()); }}
                        className="h-4 w-4 accent-[#5B4AE5]"
                      />
                    </th>
                  )}
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Apellido Paterno</th>
                  <th className="px-4 py-3 text-left">Apellido Materno</th>
                  <th className="px-4 py-3 text-left">Rol</th>
                  <th className="px-4 py-3 text-left">Correo</th>
                  <th className="px-4 py-3 text-left">Telefono</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtrados.map((r) => (
                  <tr key={r.id} className="relative">
                    {seleccionMode && (
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={seleccion.has(r.id)} onChange={()=>toggleSelect(r.id)} className="h-4 w-4 accent-[#5B4AE5]" />
                      </td>
                    )}
                    <td className="px-4 py-3">
                      {editando === r.id ? (
                        <input
                          value={(draft?.nombre ?? r.nombre)}
                          onChange={(e)=> setDraft((d)=> ({ ...(d ?? { nombre: r.nombre, apPaterno: r.apPaterno, apMaterno: r.apMaterno, correo: r.correo, telefono: r.telefono, roles: r.roles }), nombre: e.target.value }))}
                          className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-[#F9FAFF]"
                        />
                      ) : (
                        r.nombre
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editando === r.id ? (
                        <input
                          value={(draft?.apPaterno ?? r.apPaterno)}
                          onChange={(e)=> setDraft((d)=> ({ ...(d ?? { nombre: r.nombre, apPaterno: r.apPaterno, apMaterno: r.apMaterno, correo: r.correo, telefono: r.telefono, roles: r.roles }), apPaterno: e.target.value }))}
                          className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-[#F9FAFF]"
                        />
                      ) : (
                        r.apPaterno
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editando === r.id ? (
                        <input
                          value={(draft?.apMaterno ?? r.apMaterno)}
                          onChange={(e)=> setDraft((d)=> ({ ...(d ?? { nombre: r.nombre, apPaterno: r.apPaterno, apMaterno: r.apMaterno, correo: r.correo, telefono: r.telefono, roles: r.roles }), apMaterno: e.target.value }))}
                          className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-[#F9FAFF]"
                        />
                      ) : (
                        r.apMaterno
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editando === r.id ? (
                        <div className="flex flex-col gap-1">
                          {catalogoRoles.map((rol) => {
                            const checked = (draft?.roles ?? r.roles).includes(rol);
                            return (
                              <label key={rol} className="flex items-center gap-2 px-2 py-1 text-[11px] rounded-lg hover:bg-slate-50">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={()=> {
                                    setDraft((d) => {
                                      const baseRoles = d ? [...d.roles] : [...r.roles];
                                      const has = baseRoles.includes(rol);
                                      const nextRoles = has ? baseRoles.filter((x) => x !== rol) : [...baseRoles, rol];
                                      const next = d ?? { nombre: r.nombre, apPaterno: r.apPaterno, apMaterno: r.apMaterno, correo: r.correo, telefono: r.telefono, roles: baseRoles };
                                      return { ...next, roles: nextRoles };
                                    });
                                  }}
                                  className="h-4 w-4 accent-[#5B4AE5]"
                                />
                                <span>{rol}</span>
                              </label>
                            );
                          })}
                        </div>
                      ) : (
                        <button type="button" onClick={()=> setRoleMenuFor(roleMenuFor === r.id ? undefined : r.id)} className="rounded-lg px-2 py-1 hover:bg-slate-100">
                          {r.roles.join(", ")}
                        </button>
                      )}
                      {roleMenuFor === r.id && editando !== r.id && (
                        <div className="absolute z-20 mt-1 bg-white rounded-xl shadow-lg border border-slate-200 px-2 py-2">
                          {catalogoRoles.map((rol) => {
                            const checked = r.roles.includes(rol);
                            return (
                              <label key={rol} className="flex items-center gap-2 px-2 py-1 text-[11px]">
                                <input type="checkbox" checked={checked} onChange={()=>toggleRole(r.id, rol)} className="h-4 w-4 accent-[#5B4AE5]" />
                                <span>{rol}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editando === r.id ? (
                        <input
                          value={(draft?.correo ?? r.correo)}
                          onChange={(e)=> setDraft((d)=> ({ ...(d ?? { nombre: r.nombre, apPaterno: r.apPaterno, apMaterno: r.apMaterno, correo: r.correo, telefono: r.telefono, roles: r.roles }), correo: e.target.value }))}
                          className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-[#F9FAFF]"
                        />
                      ) : (
                        r.correo
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editando === r.id ? (
                        <input
                          value={(draft?.telefono ?? r.telefono)}
                          onChange={(e)=> setDraft((d)=> ({ ...(d ?? { nombre: r.nombre, apPaterno: r.apPaterno, apMaterno: r.apMaterno, correo: r.correo, telefono: r.telefono, roles: r.roles }), telefono: e.target.value }))}
                          className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-[#F9FAFF]"
                        />
                      ) : (
                        r.telefono
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {editando === r.id ? (
                        <div className="inline-flex items-center gap-2">
                          <button type="button" onClick={guardarEdicion} className="px-3 py-1.5 rounded-full bg-[#5B4AE5] text-[11px] font-semibold text-white">Guardar</button>
                          <button type="button" onClick={cancelarEdicion} className="px-3 py-1.5 rounded-full bg-[#E6E7EF] text-[11px] font-semibold text-slate-700">Cancelar</button>
                        </div>
                      ) : (
                        <div className="relative inline-block">
                          <button
                            type="button"
                            onClick={(e)=> { e.stopPropagation(); setMenuOpen((m)=> m===r.id ? null : r.id); }}
                            className="h-8 w-8 rounded-full hover:bg-slate-100 inline-flex items-center justify-center"
                          >
                            <FiMoreVertical />
                          </button>
                          {menuOpen === r.id && (
                            <div className="absolute right-0 mt-2 w-32 rounded-xl border border-slate-200 bg-white shadow-sm" onClick={(e)=> e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={()=> iniciarEdicion(r)}
                                className="w-full text-left px-3 py-2 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                onClick={()=> {
                                  setRows((prev)=> prev.filter((x)=> x.id !== r.id));
                                  setSeleccion((prev)=> { const s = new Set(prev); s.delete(r.id); return s; });
                                  if (editando === r.id) { setEditando(null); setDraft(null); }
                                  setMenuOpen(null);
                                }}
                                className="w-full text-left px-3 py-2 text-[11px] font-semibold text-rose-600 hover:bg-rose-50"
                              >
                                Eliminar
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openAdd && (
        <AñadirPersonal
          open={openAdd}
          onClose={()=>setOpenAdd(false)}
          onAdd={(nuevo)=>{
            setRows((prev)=>[...prev, nuevo]);
            setOpenAdd(false);
          }}
        />
      )}
    </section>
  );
};

export default SeccionPersonalDesenglose;
