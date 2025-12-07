import type { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavbarEvento from "../componentes/desengloseEvento/NavbarEvento";

export const PaginaDesengloseEventoAdmin: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const onSalir = () => {
      navigate("/admin-general/auditoria");
    };
    window.addEventListener("admin-eventos:salir", onSalir as EventListener);
    return () => {
      window.removeEventListener("admin-eventos:salir", onSalir as EventListener);
    };
  }, [navigate]);

  return (
    <div className="h-full px-1 md:px-1 py-1 md:py-1 overflow-hidden">
      <div className="h-full w-[99%] mx-auto bg-white rounded-[32px] shadow-2xl flex flex-col overflow-hidden">
        <NavbarEvento titulo="Concurso de Robótica Junior" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PaginaDesengloseEventoAdmin;
