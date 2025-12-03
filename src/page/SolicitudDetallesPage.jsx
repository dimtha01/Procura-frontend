// src/page/SolicitudDetallesPage.jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const SolicitudDetallesPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [tipoFilter, setTipoFilter] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Datos de ejemplo - reemplazar con fetch real usando el ID
  const solicitud = {
    id: id,
    fecha: '2025-11-27',
    nombreArchivo: 'solicitud_proyecto_norte_nov2025.xlsx',
    totalItems: 156,
    observaciones: 'Solicitud urgente para proyecto Norte - Fase 1',
    items: [
      { 
        linea: 1, 
        codigo: 'PROD-001', 
        descripcion: 'Válvula de Bola 2" Acero Inoxidable', 
        cantidad: 25, 
        tipo: 'Productos', 
        unidad: 'Unidad',
        estado: 'Aprobado',
        observacion: 'Stock disponible'
      },
      { 
        linea: 2, 
        codigo: 'PROD-002', 
        descripcion: 'Tubo PVC 4" Schedule 40 - 6 metros', 
        cantidad: 50, 
        tipo: 'Productos', 
        unidad: 'Metro',
        estado: 'Aprobado',
        observacion: 'Confirmar medidas'
      },
      { 
        linea: 3, 
        codigo: 'MAT-015', 
        descripcion: 'Codo 90° 2" Roscado Hierro Galvanizado', 
        cantidad: 80, 
        tipo: 'Materiales', 
        unidad: 'Unidad',
        estado: 'Pendiente',
        observacion: 'Esperando cotización'
      },
      { 
        linea: 4, 
        codigo: 'SERV-008', 
        descripcion: 'Instalación sistema tubería completo', 
        cantidad: 1, 
        tipo: 'Servicios', 
        unidad: 'Global',
        estado: 'En Revisión',
        observacion: 'Requiere inspección técnica'
      },
      { 
        linea: 5, 
        codigo: 'EQUIP-022', 
        descripcion: 'Compresor de aire 25HP trifásico', 
        cantidad: 2, 
        tipo: 'Equipos', 
        unidad: 'Unidad',
        estado: 'Rechazado',
        observacion: 'Presupuesto excedido'
      },
      { 
        linea: 6, 
        codigo: 'MAT-045', 
        descripcion: 'Teflón industrial rollo 50m', 
        cantidad: 15, 
        tipo: 'Materiales', 
        unidad: 'Rollo',
        estado: 'Aprobado',
        observacion: ''
      },
      { 
        linea: 7, 
        codigo: 'PROD-089', 
        descripcion: 'Válvula Compuerta 4" Hierro Fundido', 
        cantidad: 12, 
        tipo: 'Productos', 
        unidad: 'Unidad',
        estado: 'Aprobado',
        observacion: 'Entrega en 7 días'
      },
      { 
        linea: 8, 
        codigo: 'MAT-101', 
        descripcion: 'Niple Hierro Galvanizado 1/2" x 6"', 
        cantidad: 100, 
        tipo: 'Materiales', 
        unidad: 'Unidad',
        estado: 'En Proceso',
        observacion: 'Pedido a proveedor'
      },
    ]
  };

  const getStatusConfig = (estado) => {
    const configs = {
      'Pendiente': { bg: 'bg-yellow-100', text: 'text-yellow-700', badge: 'bg-yellow-500' },
      'En Revisión': { bg: 'bg-blue-100', text: 'text-blue-700', badge: 'bg-blue-500' },
      'Aprobado': { bg: 'bg-green-100', text: 'text-green-700', badge: 'bg-green-500' },
      'Rechazado': { bg: 'bg-red-100', text: 'text-red-700', badge: 'bg-red-500' },
      'En Proceso': { bg: 'bg-orange-100', text: 'text-orange-700', badge: 'bg-orange-500' },
    };
    return configs[estado] || configs['Pendiente'];
  };

  const getTipoConfig = (tipo) => {
    const configs = {
      'Productos': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      'Servicios': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      'Materiales': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
      'Equipos': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
    };
    return configs[tipo] || configs['Productos'];
  };

  const filteredItems = solicitud.items.filter(item => {
    const matchesSearch = item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || item.estado === statusFilter;
    const matchesTipo = tipoFilter === 'todos' || item.tipo === tipoFilter;
    return matchesSearch && matchesStatus && matchesTipo;
  });

  // Estadísticas
  const stats = {
    total: solicitud.items.length,
    aprobados: solicitud.items.filter(i => i.estado === 'Aprobado').length,
    pendientes: solicitud.items.filter(i => i.estado === 'Pendiente' || i.estado === 'En Revisión').length,
    enProceso: solicitud.items.filter(i => i.estado === 'En Proceso').length,
    rechazados: solicitud.items.filter(i => i.estado === 'Rechazado').length,
  };

  // Paginación
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <button 
                onClick={() => navigate('/solicitudes/lista')}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-800 truncate">{solicitud.id}</h1>
                <p className="text-xs text-gray-500 hidden sm:block truncate">{solicitud.nombreArchivo}</p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 text-xs sm:text-sm font-semibold flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Información de la Solicitud */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Fecha de Carga</p>
              <p className="text-sm font-semibold text-gray-800">
                {new Date(solicitud.fecha).toLocaleDateString('es-ES', { 
                  day: '2-digit', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Total de Ítems</p>
              <p className="text-sm font-semibold text-gray-800">{solicitud.totalItems} ítems</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Observaciones</p>
              <p className="text-sm font-semibold text-gray-800 line-clamp-2">{solicitud.observaciones}</p>
            </div>
          </div>
        </div>

        {/* Estadísticas - Scroll horizontal en móvil */}
        <div className="mb-4 sm:mb-6 -mx-3 sm:mx-0 px-3 sm:px-0">
          <div className="flex sm:grid sm:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 min-w-[100px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">{stats.total}</h3>
              <p className="text-xs text-gray-600">Total</p>
            </div>

            <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 min-w-[100px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">{stats.aprobados}</h3>
              <p className="text-xs text-gray-600">Aprobados</p>
            </div>

            <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 min-w-[100px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-100 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">{stats.pendientes}</h3>
              <p className="text-xs text-gray-600">Pendientes</p>
            </div>

            <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 min-w-[100px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">{stats.enProceso}</h3>
              <p className="text-xs text-gray-600">En Proceso</p>
            </div>

            <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 min-w-[100px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">{stats.rechazados}</h3>
              <p className="text-xs text-gray-600">Rechazados</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar código o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
            </div>

            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            >
              <option value="todos">Todos los tipos</option>
              <option value="Productos">Productos</option>
              <option value="Servicios">Servicios</option>
              <option value="Materiales">Materiales</option>
              <option value="Equipos">Equipos</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            >
              <option value="todos">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Revisión">En Revisión</option>
              <option value="Aprobado">Aprobado</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
        </div>

        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Código</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Descripción</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tipo</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Cantidad</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Unidad</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Observación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((item) => {
                  const statusConfig = getStatusConfig(item.estado);
                  const tipoConfig = getTipoConfig(item.tipo);
                  
                  return (
                    <tr key={item.linea} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-600 font-medium">{item.linea}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-700">{item.codigo}</td>
                      <td className="px-4 py-3 text-gray-800 max-w-xs">{item.descripcion}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${tipoConfig.bg} ${tipoConfig.text}`}>
                          {item.tipo}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-800">{item.cantidad}</td>
                      <td className="px-4 py-3 text-gray-600">{item.unidad}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.badge}`}></span>
                          {item.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs max-w-xs truncate" title={item.observacion}>
                        {item.observacion || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {currentItems.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-500">No se encontraron ítems con los filtros aplicados</p>
            </div>
          )}
        </div>

        {/* Mobile/Tablet Cards - Hidden on Desktop */}
        <div className="lg:hidden space-y-3">
          {currentItems.map((item) => {
            const statusConfig = getStatusConfig(item.estado);
            const tipoConfig = getTipoConfig(item.tipo);
            
            return (
              <div key={item.linea} className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
                {/* Header del Card */}
                <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600">
                      {item.linea}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs text-gray-500">{item.codigo}</p>
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.descripcion}</p>
                    </div>
                  </div>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium ${tipoConfig.bg} ${tipoConfig.text}`}>
                    {item.tipo}
                  </span>
                </div>

                {/* Info Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs mb-2 sm:mb-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <span className="font-semibold text-gray-800">{item.cantidad}</span>
                    <span className="text-gray-500">{item.unidad}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.badge}`}></span>
                    {item.estado}
                  </span>
                </div>

                {/* Observación */}
                {item.observacion && (
                  <div className="pt-2 sm:pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-0.5">Observación:</p>
                    <p className="text-xs text-gray-700 line-clamp-2">{item.observacion}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty State - Mobile */}
          {currentItems.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <svg className="mx-auto w-12 h-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-500 text-sm">No se encontraron ítems</p>
            </div>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl border border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 mt-4 gap-3">
            <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              <span className="hidden sm:inline">Mostrando </span>
              {startIndex + 1} - {Math.min(endIndex, filteredItems.length)} de {filteredItems.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 sm:px-3 sm:py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Anterior</span>
              </button>
              <span className="text-xs sm:text-sm text-gray-600 px-2">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 sm:px-3 sm:py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="hidden sm:inline">Siguiente</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
