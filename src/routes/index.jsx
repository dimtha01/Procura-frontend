// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom"
// ========================================
// IMPORTAR COMPONENTES CORE
// ========================================
import { MainLayout } from "../layout/MainLayout"
import { ErrorPage } from "../page/ErrorPage"
import { LoginPage } from "../page/LoginPage"
import { DashboardPage } from "../page/DashboardPage"
import { NuevoProductoPage } from "../page/NuevoProductoPage"
import { ProductosPage } from "../page/ProductosPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />, // Maneja errores 404 y otros errores
        children: [
            {
                index: true, // Ruta por defecto cuando estás en "/"
                element: <LoginPage /> // O un componente Home si lo prefieres
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "dashboard",
                element: <DashboardPage />
            },
            {
                path: "productos/nuevo",
                element: <NuevoProductoPage />
            },
            {
                path: "productos/lista",
                element: <ProductosPage />
            }
        ]
}
])
