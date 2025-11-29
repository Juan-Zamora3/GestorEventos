import type { FC } from "react";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import EquipoCard from "./components/EquipoCard";
import ModalDetalleEquipo from "./components/ModalDetalleEquipo";
import ModalCrearEquipo from "./components/ModalCrearEquipo";

// Nota: esta sección muestra los equipos registrados (solo UI).
// Se deja preparado para integrar datos reales (fetch por evento id, filtros, selección, CRUD).

const mockEquipos = Array.from({ length: 12 }).map((_, idx) => ({
  id: `${idx + 1}`,
  nombre: "Los Tralalerites",
  institucion: "Instituto tecnologico superior de puerto peñasco",
  integrantes: 4,
  asesor: "Juan Perez Gallador",
}));

const SeccionEquiposDesenglose: FC = () => {
  // Estado de búsqueda y selección
  const [query, setQuery] = useState("");
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  // Estado de modales
  const [equipoDetalleId, setEquipoDetalleId] = useState<string | null>(null);
  const [modalNuevoEquipo, setModalNuevoEquipo] = useState(false);

  // Filtrado básico por texto (futuro: servidor o cliente con fuse/filtro avanzado)
  const equiposFiltrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockEquipos;
    return mockEquipos.filter((e) =>
      [e.nombre, e.institucion, e.asesor].some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const toggleSeleccion = (id: string) => {
    setSeleccionados((prev) => {
      const isSelected = prev.includes(id);
      const next = isSelected ? prev.filter((i) => i !== id) : [...prev, id];
      if (!isSelected) setEquipoDetalleId(id);
      return next;
    });
  };

  const cerrarDetalle = () => setEquipoDetalleId(null);

  return (
    <section className="px-6 sm:px-10 py-6">
      {/* Barra de acciones */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-slate-200 flex items-center px-4 h-11">
            <FiSearch className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar"
              className="ml-2 w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
        <button type="button" className="px-4 h-11 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold">Seleccionar</button>
        <button type="button" className="px-4 h-11 rounded-xl bg-rose-600 text-white text-sm font-semibold">Eliminar</button>
        <button type="button" onClick={() => setModalNuevoEquipo(true)} className="px-4 h-11 rounded-xl bg-[#5B4AE5] text-white text-sm font-semibold">Nuevo Equipo</button>
      </div>

      {/* Grid de tarjetas de equipos */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {equiposFiltrados.map((e) => (
          <EquipoCard
            key={e.id}
            data={e}
            seleccionado={seleccionados.includes(e.id)}
            onToggleSeleccion={() => toggleSeleccion(e.id)}
          />
        ))}
      </div>

      {/* Modal detalle de equipo */}
      {equipoDetalleId && (
        <ModalDetalleEquipo
          equipo={mockEquipos.find((x) => x.id === equipoDetalleId)!}
          onClose={cerrarDetalle}
        />
      )}

      {/* Modal creación/edición de equipo */}
      {modalNuevoEquipo && (
        <ModalCrearEquipo onClose={() => setModalNuevoEquipo(false)} />
      )}
    </section>
  );
};

export default SeccionEquiposDesenglose;
