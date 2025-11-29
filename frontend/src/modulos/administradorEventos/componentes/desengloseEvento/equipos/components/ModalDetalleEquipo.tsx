import type { FC } from "react";
import { useMemo } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import IntegrantesTable, { type IntegranteRow } from "./IntegrantesTable";

interface EquipoData {
  id: string;
  nombre: string;
  institucion: string;
  integrantes: number;
  asesor: string;
}

interface Props {
  equipo: EquipoData;
  onClose: () => void;
}

// Modal de detalle del equipo (solo UI).
// Preparado para recibir datos reales y acciones de edición/eliminación.
const ModalDetalleEquipo: FC<Props> = ({ equipo, onClose }) => {
  const rows: IntegranteRow[] = useMemo(() => ([
    { nombre: "Sofía", apellidoPaterno: "González", apellidoMaterno: "Pérez", rol: "Asesor", institucion: "ITSPP", correo: "correo@gmail.com" },
    { nombre: "Santiago", apellidoPaterno: "Rodríguez", apellidoMaterno: "López", rol: "Líder", institucion: "ITSPP", correo: "correo@gmail.com" },
    { nombre: "Valentina", apellidoPaterno: "Martínez", apellidoMaterno: "Hernández", rol: "Integrante", institucion: "ITSPP", correo: "correo@gmail.com" },
    { nombre: "Sebastián", apellidoPaterno: "García", apellidoMaterno: "Sánchez", rol: "Integrante", institucion: "ITSPP", correo: "correo@gmail.com" },
    { nombre: "Isabella", apellidoPaterno: "Pérez", apellidoMaterno: "Ramírez", rol: "Integrante", institucion: "ITSPP", correo: "correo@gmail.com", telefono: "6381006000" },
  ]), []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-[92%] max-w-[860px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-6 pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900">{equipo.nombre}</h3>
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 rounded-xl bg-[#EFF0FF] text-[#5B4AE5] flex items-center justify-center"><FiEdit2 /></button>
              <button className="h-10 w-10 rounded-xl bg-[#FFE8E8] text-rose-600 flex items-center justify-center"><FiTrash /></button>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2">En este apartado se agregará la información para la creación de un Nuevo equipo</p>
        </div>

        <div className="px-6 pb-6">
          <p className="text-sm font-semibold text-slate-800 mb-2">Integrantes</p>
          <IntegrantesTable rows={rows} />
        </div>

        <div className="px-6 pb-6 flex items-center justify-end gap-3">
          <button className="px-4 h-10 rounded-xl bg-[#EFF0FF] text-[#4A4691]">Salir</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalleEquipo;

