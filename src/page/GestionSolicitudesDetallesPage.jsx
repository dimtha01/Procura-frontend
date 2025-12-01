// src/page/GestionSolicitudDetallesPage.jsx (Vista Admin - Editar Estados)
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const GestionSolicitudesDetallesPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [tipoFilter, setTipoFilter] = useState('todos');
  const [guardando, setGuardando] = useState(false);
  
  // Modales
  const [modalGuardar, setModalGuardar] = useState(false);
  const [modalDescartar, setModalDescartar] = useState(false);
  const [modalExito, setModalExito] = useState(false);
  const [modalError, setModalError] = useState(false);

  // Datos de ejemplo
  const [solicitud, setSolicitud] = useState({
    id: id,
    cliente: 'Juan Pérez',
    email: 'juan.perez@empresa.com',
    fecha: '2025-11-27',
    nombreArchivo: 'solicitud_proyecto_norte_nov2025.xlsx',
    totalItems: 8,
    observaciones: 'Solicitud urgente para proyecto Norte - Fase 1',
  });

  const [items, setItems] = useState([
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
      observacion: ''
    },
    { 
      linea: 4, 
      codigo: 'SERV-008', 
      descripcion: 'Instalación sistema tubería completo', 
      cantidad: 1, 
      tipo: 'Servicios', 
      unidad: 'Global',
      estado: 'En Revisión',
      observacion: ''
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
      estado: 'Pendiente',
      observacion: ''
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
  ]);

  const [itemsOriginales] = useState(JSON.parse(JSON.stringify(items)));

  const hayCambios = () => {
    return JSON.stringify(items) !== JSON.stringify(itemsOriginales);
  };

  const handleChangeEstado = (linea, nuevoEstado) => {
    setItems(prev => prev.map(item => 
      item.linea === linea ? { ...item, estado: nuevoEstado } : item
    ));
  };

  const handleChangeObservacion = (linea, nuevaObservacion) => {
    setItems(prev => prev.map(item => 
      item.linea === linea ? { ...item, observacion: nuevaObservacion } : item
    ));
  };

  const handleGuardarCambios = async () => {
    setModalGuardar(false);
    setGuardando(true);
    try {
      // TODO: PUT al backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGuardando(false);
      setModalExito(true);
    } catch (error) {
      setGuardando(false);
      setModalError(true);
    }
  };

  const handleDescartarCambios = () => {
    setItems(JSON.parse(JSON.stringify(itemsOriginales)));
    setModalDescartar(false);
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

  const filteredItems = items.filter(item => {
    const matchesSearch = item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || item.estado === statusFilter;
    const matchesTipo = tipoFilter === 'todos' || item.tipo === tipoFilter;
    return matchesSearch && matchesStatus && matchesTipo;
  });

  const stats = {
    total: items.length,
    aprobados: items.filter(i => i.estado === 'Aprobado').length,
    pendientes: items.filter(i => i.estado === 'Pendiente' || i.estado === 'En Revisión').length,
    enProceso: items.filter(i => i.estado === 'En Proceso').length,
    rechazados: items.filter(i => i.estado === 'Rechazado').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/solicitudes/gestion')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">{solicitud.id}</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Cliente: {solicitud.cliente}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {hayCambios() && (
                <div className="hidden sm:flex items-center gap-2 text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Cambios sin guardar</span>
                </div>
              )}
              
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 text-sm font-semibold"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pb-24">
        {/* Info Solicitud */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Cliente</p>
              <p className="text-sm font-semibold text-gray-800">{solicitud.cliente}</p>
              <p className="text-xs text-gray-500">{solicitud.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Archivo</p>
              <p className="text-sm font-semibold text-gray-800 truncate">{solicitud.nombreArchivo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Fecha de Carga</p>
              <p className="text-sm font-semibold text-gray-800">
                {new Date(solicitud.fecha).toLocaleDateString('es-ES', { 
                  day: '2-digit', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{stats.total}</h3>
            <p className="text-xs text-gray-600">Total</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{stats.aprobados}</h3>
            <p className="text-xs text-gray-600">Aprobados</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{stats.pendientes}</h3>
            <p className="text-xs text-gray-600">Pendientes</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{stats.enProceso}</h3>
            <p className="text-xs text-gray-600">En Proceso</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{stats.rechazados}</h3>
            <p className="text-xs text-gray-600">Rechazados</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por código o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
            </div>

            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
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
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
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

        {/* Tabla */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Observación Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => {
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
                        <select
                          value={item.estado}
                          onChange={(e) => handleChangeEstado(item.linea, e.target.value)}
                          className={`w-full px-2 py-1.5 rounded-lg text-xs font-semibold border-2 focus:ring-2 focus:ring-orange-500 outline-none ${statusConfig.bg} ${statusConfig.text} ${statusConfig.bg.replace('100', '200')}`}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En Revisión">En Revisión</option>
                          <option value="Aprobado">Aprobado</option>
                          <option value="En Proceso">En Proceso</option>
                          <option value="Rechazado">Rechazado</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.observacion}
                          onChange={(e) => handleChangeObservacion(item.linea, e.target.value)}
                          placeholder="Agregar observación..."
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Botones Guardar/Descartar */}
      {hayCambios() && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800">Tienes cambios sin guardar</p>
                  <p className="text-xs text-gray-600 hidden sm:block">Los cambios se perderán si sales sin guardar</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setModalDescartar(true)}
                  className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Descartar</span>
                </button>

                <button
                  onClick={() => setModalGuardar(true)}
                  disabled={guardando}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-500/30 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Guardar */}
      {modalGuardar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-2">
              ¿Guardar Cambios?
            </h3>

            <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
              Se actualizarán los estados y observaciones de todos los ítems modificados. Esta acción notificará al cliente.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setModalGuardar(false)}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarCambios}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-500/30 hover:shadow-xl text-sm sm:text-base"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Descartar */}
      {modalDescartar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-2">
              ¿Descartar Cambios?
            </h3>

            <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
              Se perderán todas las modificaciones realizadas. Esta acción no se puede deshacer.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setModalDescartar(false)}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                onClick={handleDescartarCambios}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-red-500/30 hover:shadow-xl text-sm sm:text-base"
              >
                Descartar Todo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Éxito */}
      {modalExito && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-2">
              ¡Cambios Guardados!
            </h3>

            <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
              Los cambios se han guardado exitosamente y el cliente ha sido notificado.
            </p>

            <button
              onClick={() => {
                setModalExito(false);
                navigate('/solicitudes/gestion');
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-500/30 hover:shadow-xl text-sm sm:text-base"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Modal Error */}
      {modalError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-2">
              Error al Guardar
            </h3>

            <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
              Ocurrió un error al intentar guardar los cambios. Por favor, intenta nuevamente.
            </p>

            <button
              onClick={() => setModalError(false)}
              className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-red-500/30 hover:shadow-xl text-sm sm:text-base"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};
