// src/modulos/administradorEventos/componentes/desengloseEvento/NavbarEvento.tsx
import type { FC } from "react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

interface Props {
  titulo: string;
}

const tabs = [
  { id: "informacion", label: "Información" },
  { id: "equipos", label: "Equipos" },
  { id: "participantes", label: "Participantes" },
  { id: "personal", label: "Personal" },
  { id: "asistencias", label: "Asistencias" },
  { id: "plantillas", label: "Plantillas" },
  { id: "constancias", label: "Constancias" },
  { id: "formulario", label: "Formulario" },
];

const NavbarEvento: FC<Props> = ({ titulo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const base = `/admin-eventos/evento/${id ?? ""}`;
  const path = location.pathname.replace(base, "").replace(/^\//, "");
  const activo = path.length === 0 ? "informacion" : path.split("/")[0];

  // animación de entrada del header
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 50);
    return () => window.clearTimeout(t);
  }, []);

  // refs para el indicador
  const navRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const recalcIndicator = () => {
    const container = navRef.current;
    const activeBtn = tabRefs.current[activo];
    if (!container || !activeBtn) return;

    const cRect = container.getBoundingClientRect();
    const aRect = activeBtn.getBoundingClientRect();

    const maxWidth = Math.min(aRect.width - 8, 96);
    const left =
      aRect.left - cRect.left + (aRect.width - maxWidth) / 2;

    setIndicator({
      left,
      width: maxWidth,
    });
  };

  // medir después del layout
  useLayoutEffect(() => {
    recalcIndicator();
  }, [activo]);

  // actualizar en resize
  useEffect(() => {
    const onResize = () => recalcIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activo]);

  return (
    <header className="flex-shrink-0">
      <div
        className={`bg-gradient-to-r from-[#192D69] to-[#6581D6] text-white rounded-t-[32px] transform-gpu transition-all duration-700 ${
          mounted ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
      >
        <div className="px-6 sm:px-10 pt-6">
          <div className="grid grid-cols-3 items-center">
            {/* Botón regresar */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transform-gpu transition hover:scale-105"
              >
                <FiChevronLeft className="text-lg" />
              </button>
            </div>

            {/* título */}
            <div className="flex justify-center">
              <h1 className="text-base sm:text-lg font-semibold text-center">
                {titulo}
              </h1>
            </div>

            <div />
          </div>
        </div>

        {/* NAV TABS */}
        <nav className="mt-5 px-6 sm:px-10 pb-5">
          <div
            ref={navRef}
            className="relative w-full bg-[#E5E9F6] rounded-md px-2 py-1"
          >
            <ul className="flex items-center justify-center gap-10 text-sm text-[#5A5F8D]">
              {tabs.map((t) => {
                const selected = activo === t.id;
                return (
                  <li key={t.id} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          t.id === "informacion" ? base : `${base}/${t.id}`,
                        )
                      }
                      ref={(el) => {
                        tabRefs.current[t.id] = el;
                      }}
                      className={[
                        "inline-block w-28 px-3 py-2 rounded-lg text-center",
                        "transform-gpu transition-all duration-200",
                        "cursor-pointer",
                        selected
                          ? "text-[#4A4691] font-semibold bg-white/80 shadow-md -translate-y-1 scale-105"
                          : "text-[#5A5F8D]",
                        "hover:-translate-y-2 hover:scale-110 hover:bg-white hover:text-[#4A4691] hover:shadow-lg",
                      ].join(" ")}
                    >
                      {t.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Indicador azul */}
            <span
              className="pointer-events-none absolute bottom-0 left-0 h-2 rounded-full bg-gradient-to-r from-[#5B5AE5] to-[#7B5CFF]"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: `${indicator.width}px`,
                transition:
                  "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), width 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavbarEvento;
