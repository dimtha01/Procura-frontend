// src/pages/ProductosPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProductosPage = () => {
  const navigate = useNavigate();

  // Estado inicial de ejemplo (luego lo reemplazas por datos del backend)
  const datosIniciales = [
    {
      id: 1,
      nombre: 'Válvula de Bola 2" Bronce',
      categoria: "Válvulas",
      marca: "Apollo",
      modelo: "APO-7700",
      material: "Bronce",
      precio: 45.5,
      stock: 150,
      confianza: 98,
      estatus: "Validado",
      fecha: "27 Nov 2025",
    },
    {
      id: 2,
      nombre: 'Tubo PVC 4" Schedule 40',
      categoria: "Tubería",
      marca: "Pavco",
      modelo: "PVC-4-40",
      material: "PVC",
      precio: 12.3,
      stock: 85,
      confianza: 92,
      estatus: "Borrador",
      fecha: "27 Nov 2025",
    },
    {
      id: 3,
      nombre: "Bomba Centrífuga 5HP",
      categoria: "Equipos",
      marca: "Grundfos",
      modelo: "GRU-5HP",
      material: "Acero Inoxidable",
      precio: 850.0,
      stock: 12,
      confianza: 96,
      estatus: "Validado",
      fecha: "26 Nov 2025",
    },
    {
      id: 4,
      nombre: 'Codo 90° 2" Roscado',
      categoria: "Accesorios",
      marca: "Mueller",
      modelo: "C90-2",
      material: "Hierro Galvanizado",
      precio: 5.75,
      stock: 340,
      confianza: 88,
      estatus: "Validado",
      fecha: "26 Nov 2025",
    },
  ];

  const [productos, setProductos] = useState(datosIniciales);
  const [productosOriginales, setProductosOriginales] = useState(
    JSON.parse(JSON.stringify(datosIniciales))
  );
  const [filtroEstatus, setFiltroEstatus] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Detectar si hay cambios
  const hayCambios = () => {
    return JSON.stringify(productos) !== JSON.stringify(productosOriginales);
  };

  // Editar cualquier campo
  const handleCellEdit = (id, field, value) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Agregar fila vacía
  const handleAddRow = () => {
    const newId = productos.length
      ? Math.max(...productos.map((p) => p.id)) + 1
      : 1;

    setProductos((prev) => [
      {
        id: newId,
        nombre: "",
        categoria: "",
        marca: "",
        modelo: "",
        material: "",
        precio: 0,
        stock: 0,
        confianza: 0,
        estatus: "Borrador",
        fecha: new Date().toLocaleDateString("es-ES", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      },
      ...prev,
    ]);
  };

  // Eliminar fila
  const handleDeleteRow = (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  // Cambiar estatus
  const handleChangeStatus = (id, nuevoEstatus) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estatus: nuevoEstatus } : p))
    );
  };

  // Guardar todos los cambios
  const handleGuardarCambios = async () => {
    setGuardando(true);
    
    try {
      // TODO: Aquí harías el POST/PUT al backend
      // await fetch('/api/productos/bulk', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      //   body: JSON.stringify({ productos })
      // });

      // Simular delay del servidor
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actualizar el estado original para que los cambios se consideren guardados
      setProductosOriginales(JSON.parse(JSON.stringify(productos)));
      
      alert("✅ Cambios guardados exitosamente");
    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar los cambios");
    } finally {
      setGuardando(false);
    }
  };

  // Descartar cambios
  const handleDescartarCambios = () => {
    if (!window.confirm("¿Descartar todos los cambios no guardados?")) return;
    setProductos(JSON.parse(JSON.stringify(productosOriginales)));
  };

  // Filtrar productos
  const productosFiltrados = productos.filter((p) => {
    const matchEstatus =
      filtroEstatus === "Todos" || p.estatus === filtroEstatus;
    const matchBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstatus && matchBusqueda;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header Simple */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-semibold text-sm sm:text-base">
                Volver al Dashboard
              </span>
            </button>

            <h1 className="text-base sm:text-lg font-bold text-gray-800">
              Gestión de Productos
            </h1>

            {/* Indicador de cambios */}
            {hayCambios() && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Cambios sin guardar</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pb-24">
        <div className="space-y-4 sm:space-y-6">
          {/* Filtros y búsqueda */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Búsqueda */}
              <div className="flex-1">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por nombre, marca o categoría..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* Filtro por estatus */}
              <div className="sm:w-48">
                <select
                  value={filtroEstatus}
                  onChange={(e) => setFiltroEstatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                >
                  <option>Todos</option>
                  <option>Borrador</option>
                  <option>Validado</option>
                  <option>Rechazado</option>
                </select>
              </div>

              {/* Botón agregar producto */}
              <button
                onClick={handleAddRow}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-all text-sm flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="hidden sm:inline">Nuevo Producto</span>
                <span className="sm:hidden">Nuevo</span>
              </button>
            </div>

            {/* Contador */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-semibold">
                  {productosFiltrados.length}
                </span>
                <span>
                  producto{productosFiltrados.length !== 1 ? "s" : ""} mostrado
                  {productosFiltrados.length !== 1 ? "s" : ""}
                </span>
                {(filtroEstatus !== "Todos" || busqueda) && (
                  <span className="text-gray-400">
                    (de {productos.length} totales)
                  </span>
                )}
              </div>

              {/* Indicador de cambios en móvil */}
              {hayCambios() && (
                <div className="sm:hidden flex items-center gap-2 text-xs text-orange-600">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Sin guardar</span>
                </div>
              )}
            </div>
          </div>

          {/* Tabla de productos */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-8">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Marca
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Modelo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Estatus
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">
                      IA %
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productosFiltrados.map((producto, index) => (
                    <tr
                      key={producto.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={producto.nombre}
                          onChange={(e) =>
                            handleCellEdit(producto.id, "nombre", e.target.value)
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={producto.categoria}
                          onChange={(e) =>
                            handleCellEdit(
                              producto.id,
                              "categoria",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        >
                          <option value="">Seleccionar</option>
                          <option>Válvulas</option>
                          <option>Tubería</option>
                          <option>Accesorios</option>
                          <option>Equipos</option>
                          <option>Herramientas</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={producto.marca}
                          onChange={(e) =>
                            handleCellEdit(producto.id, "marca", e.target.value)
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={producto.modelo}
                          onChange={(e) =>
                            handleCellEdit(producto.id, "modelo", e.target.value)
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={producto.material}
                          onChange={(e) =>
                            handleCellEdit(
                              producto.id,
                              "material",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          value={producto.precio}
                          onChange={(e) =>
                            handleCellEdit(
                              producto.id,
                              "precio",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={producto.stock}
                          onChange={(e) =>
                            handleCellEdit(producto.id, "stock", e.target.value)
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={producto.estatus}
                          onChange={(e) =>
                            handleChangeStatus(producto.id, e.target.value)
                          }
                          className={`w-full px-2 py-1 text-xs font-medium border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                            producto.estatus === "Validado"
                              ? "bg-green-50 text-green-700"
                              : producto.estatus === "Borrador"
                              ? "bg-orange-50 text-orange-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          <option>Borrador</option>
                          <option>Validado</option>
                          <option>Rechazado</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            producto.confianza >= 95
                              ? "bg-green-100 text-green-700"
                              : producto.confianza >= 85
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {producto.confianza}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDeleteRow(producto.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {productosFiltrados.map((producto, index) => (
                <div
                  key={producto.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          producto.confianza >= 95
                            ? "bg-green-100 text-green-700"
                            : producto.confianza >= 85
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        IA: {producto.confianza}%
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteRow(producto.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={producto.nombre}
                        onChange={(e) =>
                          handleCellEdit(producto.id, "nombre", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Categoría
                        </label>
                        <select
                          value={producto.categoria}
                          onChange={(e) =>
                            handleCellEdit(
                              producto.id,
                              "categoria",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        >
                          <option value="">Seleccionar</option>
                          <option>Válvulas</option>
                          <option>Tubería</option>
                          <option>Accesorios</option>
                          <option>Equipos</option>
                          <option>Herramientas</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Marca
                        </label>
                        <input
                          type="text"
                          value={producto.marca}
                          onChange={(e) =>
                            handleCellEdit(producto.id, "marca", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Modelo
                        </label>
                        <input
                          type="text"
                          value={producto.modelo}
                          onChange={(e) =>
                            handleCellEdit(producto.id, "modelo", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Material
                        </label>
                        <input
                          type="text"
                          value={producto.material}
                          onChange={(e) =>
                            handleCellEdit(
                              producto.id,
                              "material",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Precio (USD)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={producto.precio}
                          onChange={(e) =>
                            handleCellEdit(
                              producto.id,
                              "precio",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Stock
                        </label>
                        <input
                          type="number"
                          value={producto.stock}
                          onChange={(e) =>
                            handleCellEdit(producto.id, "stock", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Estatus
                      </label>
                      <select
                        value={producto.estatus}
                        onChange={(e) =>
                          handleChangeStatus(producto.id, e.target.value)
                        }
                        className={`w-full px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                          producto.estatus === "Validado"
                            ? "bg-green-50 text-green-700"
                            : producto.estatus === "Borrador"
                            ? "bg-orange-50 text-orange-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        <option>Borrador</option>
                        <option>Validado</option>
                        <option>Rechazado</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Botón flotante para guardar cambios */}
      {hayCambios() && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Tienes cambios sin guardar
                  </p>
                  <p className="text-xs text-gray-600">
                    Los cambios se perderán si sales sin guardar
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleDescartarCambios}
                  disabled={guardando}
                  className="px-3 sm:px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Descartar
                </button>
                <button
                  onClick={handleGuardarCambios}
                  disabled={guardando}
                  className="px-4 sm:px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-500/30 hover:shadow-xl text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {guardando ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Guardar Cambios</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
