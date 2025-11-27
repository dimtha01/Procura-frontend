// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
  return (
    <div>
      {/* Header, Navbar, o cualquier componente global */}
      
      {/* Outlet renderiza el componente de la ruta activa */}
      <Outlet />
      
      {/* Footer o componentes globales */}
    </div>
  )
}
