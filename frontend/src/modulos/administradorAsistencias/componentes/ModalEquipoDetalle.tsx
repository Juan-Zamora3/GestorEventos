import React from "react";

interface Props {
  onClose: () => void;
}

const ModalEquipoDetalle: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <div className="w-[900px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <header className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Los Tralalerites
            </h2>
            <p className="mt-1 text-xs text-slate-500 max-w-xl">
              En este apartado se agregará la información para la creación de un
              Nuevo equipo.
            </p>
          </div>

          <button
            type="button"
            className="h-10 w-10 rounded-xl bg-[#F5F6FB] text-[#5B4AE5] flex items-center justify-center text-lg"
          >
            ✎
          </button>
        </header>

        <div className="px-8 py-5 overflow-auto">
          <p className="text-xs font-semibold text-slate-700 mb-3">
            Integrantes
          </p>

          <div className="border border-slate-100 rounded-2xl overflow-hidden text-xs">
            <table className="w-full">
              <thead className="bg-[#F5F6FB] text-slate-500">
                <tr>
                  <th className="text-left px-4 py-2">Nombre</th>
                  <th className="text-left px-4 py-2">Apellido Paterno</th>
                  <th className="text-left px-4 py-2">Apellido Materno</th>
                  <th className="text-left px-4 py-2">Rol</th>
                  <th className="text-left px-4 py-2">Institución</th>
                  <th className="text-left px-4 py-2">Correo</th>
                  <th className="text-left px-4 py-2">Teléfono</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {["Sofía", "Santiago", "Valentina", "Sebastián", "Isabella"].map(
                  (nombre, i) => (
                    <tr key={nombre}>
                      <td className="px-4 py-2">{nombre}</td>
                      <td className="px-4 py-2">González</td>
                      <td className="px-4 py-2">Pérez</td>
                      <td className="px-4 py-2">
                        {i === 1 ? "Líder" : i === 0 ? "Asesor" : "Integrante"}
                      </td>
                      <td className="px-4 py-2">ITSPP</td>
                      <td className="px-4 py-2">correo@gmail.com</td>
                      <td className="px-4 py-2">6381006000</td>
                      <td className="px-4 py-2 text-right">⋮</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="px-8 py-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#5B4AE5] to-[#7B5CFF] text-sm font-semibold text-white shadow-sm"
          >
            Salir
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ModalEquipoDetalle;
