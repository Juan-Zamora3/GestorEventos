import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const logoTecnm = "/logoTECNM.png"; // 👈 tu logo

type TabAdmin = "auditoria" | "usuarios" | "historial";

export const LayoutAdminGeneral: React.FC = () => {
  const location = useLocation();

  const path = location.pathname;
  const isEvento = path.startsWith("/admin-general/auditoria/");
  let tabActiva: TabAdmin = "auditoria";

  if (path.includes("/usuarios")) tabActiva = "usuarios";
  else if (path.includes("/historial")) tabActiva = "historial";

  const getClaseTab = (tab: TabAdmin) =>
    `px-8 py-2 rounded-full text-sm font-medium transition ${
      tabActiva === tab
        ? "bg-white text-sky-800 shadow-sm"
        : "bg-white/10 text-white hover:bg-white/20"
    }`;

  return (
    <div className="min-h-screen w-full bg-[#EFF3FB] flex flex-col">
      {/* BARRA SUPERIOR (oculta en desenglose de evento) */}
      {!isEvento && (
        <header
          className="w-full text-white px-8 py-3 flex items-center justify-between shadow-md"
          style={{
            background:
              "linear-gradient(90deg, #192D69 0%, #6581D6 100%)",
          }}
        >
          <img
            src={logoTecnm}
            alt="TECNOLÓGICO NACIONAL DE MÉXICO"
            className="h-10 w-auto"
          />

          {/* Tabs */}
          <nav className="flex items-center gap-4">
            <Link to="auditoria" className={getClaseTab("auditoria")}>
              Auditoría
            </Link>
            <Link to="usuarios" className={getClaseTab("usuarios")}>
              Usuarios
            </Link>
            <Link to="historial" className={getClaseTab("historial")}>
              Historial
            </Link>
          </nav>

          {/* Usuario mock */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold leading-tight">
                Juan Enrique Zamora German
              </p>
              <p className="text-[11px] opacity-80 leading-tight">
                juannikki1232@gmail.com
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-white/90 overflow-hidden flex items-center justify-center">
              <span className="text-sm font-bold text-[#192D69]">JZ</span>
            </div>
          </div>
        </header>
      )}

      {/* AQUÍ VAN LAS PÁGINAS HIJAS */}
      <main className={isEvento ? "flex-1 min-h-0 overflow-y-auto px-0 py-0" : "flex-1 px-8 py-6"}>
        {isEvento ? (
          <Outlet />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={{ x: -40, opacity: 0, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.28, 1] }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};
