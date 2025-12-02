import type { FC } from "react";
import { useState } from "react";

type NuevoPersonal = {
  id: string;
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  roles: string[];
  correo: string;
  telefono: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (p: NuevoPersonal) => void;
}

const roles = [
  "Coordinador General",
  "Edecan",
  "Gestor de constancias",
  "Maestro de ceremonias",
];

const AñadirPersonal: FC<Props> = ({ open, onClose, onAdd }) => {
  const [nombre, setNombre] = useState("");
  const [apPaterno, setApPaterno] = useState("");
  const [apMaterno, setApMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rol, setRol] = useState(roles[0]);

  const aceptar = () => {
    const p: NuevoPersonal = {
      id: `P${Date.now()}`,
      nombre,
      apPaterno,
      apMaterno,
      roles: [rol],
      correo,
      telefono,
    };
    onAdd(p);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-start justify-center pt-24">
        <div className="w-[860px] max-w-[92vw] bg-white rounded-3xl shadow-2xl">
          <div className="px-8 pt-8">
            <h2 className="text-xl font-semibold text-[#312E81]">Añadir Personal</h2>
            <p className="mt-2 text-sm text-slate-600">En este apartado se agregará la información para la creación de un Nuevo equipo</p>
            <div className="mt-6 text-sm text-slate-900 font-semibold">Añadir integrante</div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <input value={nombre} onChange={(e)=>setNombre(e.target.value)} placeholder="Ej. Sofia" className="h-11 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-[#7B5CFF]/30" />
              <input value={apPaterno} onChange={(e)=>setApPaterno(e.target.value)} placeholder="Ej. Gonzales" className="h-11 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-[#7B5CFF]/30" />
              <input value={apMaterno} onChange={(e)=>setApMaterno(e.target.value)} placeholder="Ej. Perez" className="h-11 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-[#7B5CFF]/30" />
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <input value={correo} onChange={(e)=>setCorreo(e.target.value)} placeholder="Ej. correo@gmail.com" className="h-11 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-[#7B5CFF]/30" />
              <input value={telefono} onChange={(e)=>setTelefono(e.target.value)} placeholder="Ej. (638) 000-0000" className="h-11 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-[#7B5CFF]/30" />
              <div className="h-11 rounded-xl border border-slate-200 px-3 flex items-center">
                <select value={rol} onChange={(e)=>setRol(e.target.value)} className="flex-1 bg-transparent outline-none">
                  {roles.map((r)=> <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="px-8 py-6 flex justify-end gap-4">
            <button onClick={onClose} className="h-11 px-6 rounded-full bg-slate-100 text-slate-700 font-semibold">Cancelar</button>
            <button onClick={aceptar} className="h-11 px-6 rounded-full bg-gradient-to-r from-[#5B4AE5] to-[#7B5CFF] text-white font-semibold">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AñadirPersonal;

