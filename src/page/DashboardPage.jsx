// src/page/DashboardPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [userName] = useState('Juan Pérez');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setMobileMenuOpen(false); // Cerrar menú móvil si está abierto
  };

  const handleLogoutConfirm = () => {
    // TODO: Limpiar token del localStorage/sessionStorage
    // localStorage.removeItem('token');
    // sessionStorage.removeItem('user');
    
    // Redirigir al login
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img src="./src/assets/logo20.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <div>
                <h1 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800">Sistema Procura</h1>
                <p className="text-xs text-gray-500 hidden sm:block">B&D</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">Encargado Procura</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {userName.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              {/* Botón de cerrar sesión desktop */}
              <button
                onClick={handleLogoutClick}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Cerrar sesión"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {userName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">Encargado Procura</p>
                </div>
              </div>
              
              <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Notificaciones</span>
                <span className="ml-auto text-xs bg-orange-500 text-white px-2 py-1 rounded-full">3</span>
              </button>

              {/* Botón de cerrar sesión móvil */}
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 border-t border-gray-200 pt-3 mt-3"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-medium">Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            ¡Bienvenido, {userName.split(' ')[0]}!
          </h2>
          <p className="text-sm sm:text-base text-gray-600">Gestiona tus productos y especificaciones técnicas</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {/* Nuevo Producto */}
          <Link to="/productos/nuevo" className="group">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-0.5 sm:mb-1">Nuevo Producto</h3>
              <p className="text-xs sm:text-sm opacity-90 hidden sm:block">Cargar especificaciones</p>
            </div>
          </Link>

          {/* Ver Productos */}
          <Link to="/productos/lista" className="group">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-500 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-0.5 sm:mb-1">Ver Productos</h3>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Catálogo completo</p>
            </div>
          </Link>

          {/* Proveedores */}
          <Link to="/proveedores" className="group">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-500 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-0.5 sm:mb-1">Proveedores</h3>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Gestionar contactos</p>
            </div>
          </Link>

          {/* Reportes */}
          <Link to="/reportes" className="group">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-500 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-0.5 sm:mb-1">Reportes</h3>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Análisis de datos</p>
            </div>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">248</h3>
            <p className="text-xs sm:text-sm text-gray-600">Productos Totales</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-orange-600 bg-orange-50 px-2 sm:px-3 py-1 rounded-full">Pendiente</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">12</h3>
            <p className="text-xs sm:text-sm text-gray-600">Por Validar</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">+8 hoy</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">45</h3>
            <p className="text-xs sm:text-sm text-gray-600">Documentos Procesados</p>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Productos Recientes</h3>
              <Link to="/productos/lista" className="text-xs sm:text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1">
                Ver todos
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Producto</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoría</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                  <th className="px-4 lg:px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Válvula de Bola 2"', category: 'Válvulas', status: 'Validado', date: '27 Nov 2025' },
                  { name: 'Tubo PVC 4" Schedule 40', category: 'Tubería', status: 'Pendiente', date: '27 Nov 2025' },
                  { name: 'Bomba Centrífuga 5HP', category: 'Equipos', status: 'Validado', date: '26 Nov 2025' },
                  { name: 'Codo 90° 2" Roscado', category: 'Accesorios', status: 'Validado', date: '26 Nov 2025' },
                ].map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === 'Validado' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-600">{product.date}</td>
                    <td className="px-4 lg:px-6 py-4 text-right">
                      <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {[
              { name: 'Válvula de Bola 2"', category: 'Válvulas', status: 'Validado', date: '27 Nov 2025' },
              { name: 'Tubo PVC 4" Schedule 40', category: 'Tubería', status: 'Pendiente', date: '27 Nov 2025' },
              { name: 'Bomba Centrífuga 5HP', category: 'Equipos', status: 'Validado', date: '26 Nov 2025' },
              { name: 'Codo 90° 2" Roscado', category: 'Accesorios', status: 'Validado', date: '26 Nov 2025' },
            ].map((product, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 mb-1">{product.name}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-600">{product.category}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-600">{product.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'Validado' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {product.status}
                      </span>
                      <button className="text-orange-600 hover:text-orange-700 font-medium text-xs">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal de Confirmación de Cierre de Sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in">
            {/* Icono */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
            </div>

            {/* Título */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-2">
              ¿Cerrar Sesión?
            </h3>

            {/* Mensaje */}
            <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
              ¿Estás seguro de que deseas cerrar tu sesión? Tendrás que volver a iniciar sesión para acceder al sistema.
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleLogoutCancel}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-red-500/30 hover:shadow-xl text-sm sm:text-base"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
