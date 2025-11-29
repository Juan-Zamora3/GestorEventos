import type { FC } from "react";
import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import IntegrantesTable, { type IntegranteRow } from "./IntegrantesTable";

interface Props { onClose: () => void }

// Modal de creación/edición de equipo.
// Diseño fiel al mock: dos filas de campos (Nombre/Telefono y Institución/Correo),
// bloque para añadir integrante con botón y tabla dividida visualmente.
// Se deja estado local listo para integrar con API y persistencia.
const ModalCrearEquipo: FC<Props> = ({ onClose }) => {
  const initialRows: IntegranteRow[] = useMemo(() => ([
    { nombre: "Sofía", apellidoPaterno: "González", apellidoMaterno: "Pérez", rol: "Asesor", institucion: "ITSPP", correo: "correo@gmail.com" },
    { nombre: "Santiago", apellidoPaterno: "Rodríguez", apellidoMaterno: "López", rol: "Líder", institucion: "ITSPP", correo: "correo@gmail.com" },
    { nombre: "Valentina", apellidoPaterno: "Martínez", apellidoMaterno: "Hernández", rol: "Integrante", institucion: "ITSPP", correo: "correo@gmail.com" },
    { nombre: "Sebastián", apellidoPaterno: "García", apellidoMaterno: "Sánchez", rol: "Integrante", institucion: "ITSPP", correo: "correo@gmail.com" },
    { nombre: "Isabella", apellidoPaterno: "Pérez", apellidoMaterno: "Ramírez", rol: "Integrante", institucion: "ITSPP", correo: "correo@gmail.com", telefono: "6381006000" },
  ]), []);

  // Estado del formulario (listo para envío a backend)
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [telefonoEquipo, setTelefonoEquipo] = useState("");
  const [institucionEquipo, setInstitucionEquipo] = useState("");
  const [correoEquipo, setCorreoEquipo] = useState("");

  // Estado de integrantes a mostrar en la tabla
  const [rows, setRows] = useState<IntegranteRow[]>(initialRows);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoApellidoP, setNuevoApellidoP] = useState("");
  const [nuevoApellidoM, setNuevoApellidoM] = useState("");

  const handleAddIntegrante = () => {
    if (!nuevoNombre || !nuevoApellidoP || !nuevoApellidoM) return;
    setRows((prev) => [
      ...prev,
      { nombre: nuevoNombre, apellidoPaterno: nuevoApellidoP, apellidoMaterno: nuevoApellidoM, rol: "Integrante", institucion: "", correo: "" },
    ]);
    setNuevoNombre("");
    setNuevoApellidoP("");
    setNuevoApellidoM("");
  };

  const handleSubmit = () => {
    // listo para implementar envío al backend
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-[92%] max-w-[880px] bg-white rounded-[28px] shadow-2xl overflow-hidden">
        <div className="px-7 pt-7 pb-3">
          <h3 className="text-xl font-semibold text-slate-900">Añadir equipo</h3>
          <p className="text-sm text-slate-600 mt-2">En este apartado se agregará la informacion para la creacion de un Nuevo equipo</p>
        </div>

        <div className="px-7 pb-7 space-y-4">
          {/* Fila 1: Nombre del equipo / Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre del equipo</label>
              <input value={nombreEquipo} onChange={(e) => setNombreEquipo(e.target.value)}
                     className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-[#F9FAFF]"
                     placeholder="Ej. correo@gmail.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Telefono</label>
              <input value={telefonoEquipo} onChange={(e) => setTelefonoEquipo(e.target.value)}
                     className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-[#F9FAFF]"
                     placeholder="Ej. (638) 000-0000" />
            </div>
          </div>

          {/* Fila 2: Institución / Correo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Institución</label>
              <input value={institucionEquipo} onChange={(e) => setInstitucionEquipo(e.target.value)}
                     className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-[#F9FAFF]"
                     placeholder="Ej. Instituto tecnologico superior de puerto peñasco" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Correo</label>
              <input value={correoEquipo} onChange={(e) => setCorreoEquipo(e.target.value)}
                     className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-[#F9FAFF]"
                     placeholder="correo@gmail.com" />
            </div>
          </div>

          {/* Añadir integrante */}
          <div>
            <p className="text-sm font-semibold text-slate-800 mb-2">Añadir integrante</p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
              <input value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)}
                     className="rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-[#F9FAFF]" placeholder="Ej. Sofia" />
              <input value={nuevoApellidoP} onChange={(e) => setNuevoApellidoP(e.target.value)}
                     className="rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-[#F9FAFF]" placeholder="Ej. Gonzales" />
              <input value={nuevoApellidoM} onChange={(e) => setNuevoApellidoM(e.target.value)}
                     className="rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-[#F9FAFF]" placeholder="Ej. Perez" />
              <div className="flex items-center justify-end">
                <button onClick={handleAddIntegrante}
                        className="h-10 w-10 rounded-xl text-white bg-gradient-to-br from-[#5B4AE5] to-[#7B5CFF] shadow-md flex items-center justify-center">
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Tabla única con columnas: Nombre, Apellido Paterno, Apellido Materno, Rol */}
          <IntegrantesTable rows={rows} variant="simple" />
        </div>

        <div className="px-7 pb-7 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-5 h-11 rounded-2xl bg-[#EFF0FF] text-[#4A4691]">Cancelar</button>
          <button onClick={handleSubmit} className="px-5 h-11 rounded-2xl text-white bg-gradient-to-r from-[#5B4AE5] to-[#7B5CFF]">Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCrearEquipo;
