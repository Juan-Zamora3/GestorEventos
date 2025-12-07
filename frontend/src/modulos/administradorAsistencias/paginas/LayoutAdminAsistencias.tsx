// src/modulos/administradorAsistencias/paginas/LayoutAdminAsistencias.tsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const logoTecnm = "/logoTECNM.png";

const LayoutAdminAsistencias: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="min-h-screen w-full bg-[#EEF0F7] flex flex-col">
      {/* HEADER superior */}
      <header className="w-full bg-gradient-to-r from-[#1B3A80] to-[#526FCD] text-white px-8 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={logoTecnm}
            alt="TECNOLÓGICO NACIONAL DE MÉXICO"
            className="h-10 w-auto"
          />
        </div>

   

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-semibold leading-tight">
              Juan Enrique Zamora German
            </p>
            <p className="text-[11px] opacity-80 leading-tight">
              juannikki1232@gmail.com
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/90 overflow-hidden flex items-center justify-center">
            <span className="text-sm font-bold text-sky-800">JZ</span>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="flex-1">
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
      </main>
    </div>
  );
};

export default LayoutAdminAsistencias;
