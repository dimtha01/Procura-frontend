import { useState } from 'react';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header con logo */}
      <header className="absolute top-0 left-0 p-6 z-10">
        <div className="flex items-center gap-2">
          <div className="text-orange-600">
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="currentColor">
              <rect x="8" y="24" width="4" height="16"/>
              <rect x="14" y="18" width="4" height="22"/>
              <rect x="20" y="12" width="4" height="28"/>
              <rect x="26" y="8" width="4" height="32"/>
              <rect x="32" y="12" width="4" height="28"/>
              <rect x="38" y="18" width="4" height="22"/>
            </svg>
          </div>
          <div className="text-sm">
            <div className="font-bold text-gray-800">business &</div>
            <div className="font-bold text-gray-800">development</div>
          </div>
        </div>
      </header>

      {/* Main Content - Login Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
          
          {/* Panel Izquierdo - Naranja */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-12 md:w-1/2 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <div className="mb-8">
                <svg className="w-16 h-16 mb-4" viewBox="0 0 48 48" fill="white">
                  <rect x="8" y="24" width="3" height="16"/>
                  <rect x="13" y="18" width="3" height="22"/>
                  <rect x="18" y="12" width="3" height="28"/>
                  <rect x="23" y="8" width="3" height="32"/>
                  <rect x="28" y="12" width="3" height="28"/>
                  <rect x="33" y="18" width="3" height="22"/>
                  <rect x="38" y="24" width="3" height="16"/>
                </svg>
                <div className="text-2xl font-bold leading-tight">
                  business &<br/>development
                </div>
                <div className="text-sm opacity-90 mt-1">Venezuela</div>
              </div>

              {/* Título */}
              <h1 className="text-3xl font-bold mb-4">
                Corporación Business &<br/>Development
              </h1>
              <p className="text-lg mb-8 opacity-95">
                Sistema de Gestión Empresarial
              </p>

              {/* Caja de descripción */}
              <div className="bg-orange-600/50 rounded-lg p-6 backdrop-blur-sm">
                <p className="text-sm leading-relaxed">
                  Desarrollamos negocios rentables y escalables con un equipo de profesionales 
                  altamente capacitados, orientados al crecimiento y éxito de cada proyecto.
                </p>
              </div>
            </div>

            {/* Footer del panel */}
            <div className="text-sm opacity-75 mt-8">
              © 2025 Corporación Business & Development
            </div>
          </div>

          {/* Panel Derecho - Formulario */}
          <div className="p-12 md:w-1/2 flex flex-col justify-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Iniciar sesión
              </h2>
              <p className="text-gray-600 mb-8">
                Ingresa tus credenciales para acceder
              </p>

              <form onSubmit={handleSubmit}>
                {/* Campo Email */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nombre@ejemplo.com"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                {/* Campo Contraseña */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-orange-500 transition"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Botón Submit */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Iniciar sesión
                </button>
              </form>

              {/* Link de soporte */}
              <p className="text-center text-sm text-gray-600 mt-6">
                ¿Problemas para iniciar sesión?{' '}
                <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                  Contactar soporte
                </a>
              </p>

              {/* Versión */}
              <p className="text-center text-xs text-gray-500 mt-4">
                v2.0 | © 2025 Corporación B&D
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            
            {/* Logo y descripción */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-10 h-10 text-orange-600" viewBox="0 0 48 48" fill="currentColor">
                  <rect x="8" y="24" width="3" height="16"/>
                  <rect x="13" y="18" width="3" height="22"/>
                  <rect x="18" y="12" width="3" height="28"/>
                  <rect x="23" y="8" width="3" height="32"/>
                  <rect x="28" y="12" width="3" height="28"/>
                  <rect x="33" y="18" width="3" height="22"/>
                  <rect x="38" y="24" width="3" height="16"/>
                </svg>
                <div className="text-sm">
                  <div className="font-bold text-gray-800">business &</div>
                  <div className="font-bold text-gray-800">development</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 max-w-md">
                En B&D estamos comprometidos en desarrollar negocios rentables y escalables a través de nuestro 
                equipo de profesionales, orientados al logro de la autosustentabilidad y crecimiento de cada proyecto.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-4 text-lg border-b-2 border-orange-500 inline-block pb-1">
                Contacto
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>
                    Av. Salvador Feo La Cruz, Edificio World Trade Center Valencia,<br/>
                    Piso PL, oficina PL-9, Sector Mañongo, Naguanagua, Carabobo,<br/>
                    Venezuela
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p>+58 (414) 123-4567</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p>info@corporacionbd.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright y links legales */}
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© 2025 Corporación Business & Development MG. C.A. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-orange-500 transition">Términos y Condiciones</a>
              <a href="#" className="hover:text-orange-500 transition">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
