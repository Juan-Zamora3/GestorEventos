import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { FC, ReactNode } from "react";
import { FiMail, FiCheckCircle, FiAlertCircle, FiClock, FiSearch, FiEye, FiRefreshCw, FiX } from "react-icons/fi";

interface RegistroEnvio {
  id: string;
  nombre: string;
  correo: string;
  canal: "Correo" | "WhatsApp";
  asunto?: string;
  fecha: string;
  estado: "Enviado" | "Fallido" | "Pendiente";
}

interface Props {
  abierto: boolean;
  onCerrar: () => void;
  registros?: RegistroEnvio[];
}

const mock: RegistroEnvio[] = [
  { id: "1", nombre: "Sofía González", correo: "sofia@example.com", canal: "Correo", asunto: "Constancia", fecha: "2025-12-04 12:32", estado: "Enviado" },
  { id: "2", nombre: "Santiago Rodríguez", correo: "santi@example.com", canal: "Correo", asunto: "Constancia", fecha: "2025-12-04 12:34", estado: "Fallido" },
  { id: "3", nombre: "Valentina Martínez", correo: "vale@example.com", canal: "WhatsApp", fecha: "2025-12-04 12:40", estado: "Pendiente" },
  { id: "4", nombre: "Sebastián García", correo: "sebas@example.com", canal: "Correo", asunto: "Constancia", fecha: "2025-12-04 12:45", estado: "Enviado" },
];

const HistorialEnvioCorreos: FC<Props> = ({ abierto, onCerrar, registros }) => {
  const data = registros && registros.length ? registros : mock;
  const [busqueda, setBusqueda] = useState("");
  const [canal, setCanal] = useState<"Todos" | "Correo" | "WhatsApp">("Todos");
  const [estado, setEstado] = useState<"Todos" | "Enviado" | "Fallido" | "Pendiente">("Todos");
  const [det, setDet] = useState<RegistroEnvio | undefined>(undefined);

  if (!abierto) return null;

  const filtrados = useMemo(() => {
    const term = busqueda.trim().toLowerCase();
    return data.filter((r)=> {
      if (canal !== "Todos" && r.canal !== canal) return false;
      if (estado !== "Todos" && r.estado !== estado) return false;
      if (!term) return true;
      return r.nombre.toLowerCase().includes(term) || r.correo.toLowerCase().includes(term) || (r.asunto ?? "").toLowerCase().includes(term);
    });
  }, [data, busqueda, canal, estado]);

  const chipEstado = (e: RegistroEnvio["estado"]) => {
    const map: Record<typeof e, { cls: string; icon: ReactNode } > = {
      Enviado: { cls: "bg-[#E8FBEA] text-emerald-700 ring-1 ring-emerald-200", icon: <FiCheckCircle /> },
      Fallido: { cls: "bg-[#FDECEC] text-rose-700 ring-1 ring-rose-200", icon: <FiAlertCircle /> },
      Pendiente: { cls: "bg-[#FFF7E6] text-amber-700 ring-1 ring-amber-200", icon: <FiClock /> },
    } as const;
    const m = map[e];
    return <span className={`inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-[11px] ${m.cls}`}>{m.icon}{e}</span>;
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        className="w-[1200px] h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex"
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <div className="flex-1 flex flex-col h-full min-w-0">
          <header className="px-8 py-6 bg-gradient-to-r from-[#192D69] to-[#6581D6] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-9 w-9 rounded-full bg-white/15 text-white inline-flex items-center justify-center"><FiMail /></span>
              <div>
                <h2 className="text-lg font-semibold">Historial de envíos</h2>
                <p className="text-xs text-white/80">Correos y mensajes enviados de constancias</p>
              </div>
            </div>
            <button type="button" onClick={onCerrar} className="h-9 w-9 rounded-full bg-white/15 text-white inline-flex items-center justify-center hover:bg-white/25"><FiX /></button>
          </header>
          <div className="px-8 py-4 border-b border-slate-100 flex items-center gap-3 bg-white shrink-0">
            <div className="relative flex-1 max-w-md">
              <input value={busqueda} onChange={(e)=> setBusqueda(e.target.value)} placeholder="Buscar por nombre, correo o asunto" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 pr-10 text-sm" />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B4AE5]" />
            </div>
            <div className="inline-flex rounded-full bg-[#F2F3FB] p-1">
              {["Todos","Correo","WhatsApp"].map((c)=> {
                const active = canal===c;
                return (
                  <button key={c} type="button" onClick={()=> setCanal(c as typeof canal)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${active?"bg-white text-slate-800 shadow":"text-slate-700"}`}>{c}</button>
                );
              })}
            </div>
            <div className="inline-flex rounded-full bg-[#F2F3FB] p-1">
              {["Todos","Enviado","Fallido","Pendiente"].map((c)=> {
                const active = estado===c;
                return (
                  <button key={c} type="button" onClick={()=> setEstado(c as typeof estado)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${active?"bg-white text-slate-800 shadow":"text-slate-700"}`}>{c}</button>
                );
              })}
            </div>
          </div>
          <div className="px-8 py-4 overflow-auto flex-1">
            <div className="border border-slate-100 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#F0F3FF] text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-2">Nombre</th>
                    <th className="text-left px-4 py-2">Correo</th>
                    <th className="text-left px-4 py-2">Canal</th>
                    <th className="text-left px-4 py-2">Asunto</th>
                    <th className="text-left px-4 py-2">Fecha</th>
                    <th className="text-left px-4 py-2">Estado</th>
                    <th className="px-4 py-2 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[12px]">
                  {filtrados.map((r)=> (
                    <tr key={r.id} className="hover:bg-[#F9FAFF]">
                      <td className="px-4 py-2">{r.nombre}</td>
                      <td className="px-4 py-2">{r.correo}</td>
                      <td className="px-4 py-2">{r.canal}</td>
                      <td className="px-4 py-2">{r.asunto ?? "—"}</td>
                      <td className="px-4 py-2">{r.fecha}</td>
                      <td className="px-4 py-2">{chipEstado(r.estado)}</td>
                      <td className="px-4 py-2 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button type="button" onClick={()=> setDet(r)} className="h-8 w-8 rounded-full bg-gradient-to-r from-[#5B4AE5] to-[#7B5CFF] text-white inline-flex items-center justify-center hover:brightness-110"><FiEye /></button>
                          {r.estado !== "Enviado" && (
                            <button type="button" onClick={()=> setDet(r)} className="h-8 w-8 rounded-full bg-[#EEF0FF] text-[#5B4AE5] inline-flex items-center justify-center hover:bg-[#E6E9FF]"><FiRefreshCw /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <aside className="w-[380px] h-full border-l border-slate-100 bg-gradient-to-b from-[#F7F8FF] to-white flex flex-col">
          <div className="px-5 py-4 border-b border-slate-200 shrink-0">
            <p className="text-xs font-semibold text-slate-700">Detalle</p>
          </div>
          <div className="flex-1 px-5 py-4 overflow-auto">
            {det ? (
              <div className="space-y-3 text-sm">
                <p className="text-slate-900 font-semibold">{det.nombre}</p>
                <p className="text-slate-700">{det.correo}</p>
                <div className="flex items-center gap-2">{chipEstado(det.estado)}</div>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                    <p className="text-[11px] text-slate-500">Canal</p>
                    <p className="text-slate-800">{det.canal}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                    <p className="text-[11px] text-slate-500">Fecha</p>
                    <p className="text-slate-800">{det.fecha}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 col-span-2 shadow-sm">
                    <p className="text-[11px] text-slate-500">Asunto</p>
                    <p className="text-slate-800">{det.asunto ?? "—"}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="button" className="px-4 py-2 rounded-full bg-gradient-to-r from-[#5B4AE5] to-[#7B5CFF] text-xs font-semibold text-white hover:brightness-110">Reenviar</button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">Selecciona un envío para ver su detalle</p>
            )}
          </div>
        </aside>
      </motion.div>
    </div>
  );
};

export default HistorialEnvioCorreos;
