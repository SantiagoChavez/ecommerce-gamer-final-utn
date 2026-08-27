import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

function Navbar({ usuario, onLogout, carrito, busqueda, setBusqueda }) {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { tema, toggleTema } = useTheme();

  const handleSalir = () => {
    onLogout();
    navigate('/');
    setMenuAbierto(false);
  };

  const cantidadTotal = carrito ? carrito.reduce((acc, item) => acc + item.cantidad, 0) : 0;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Lado Izquierdo: Marca de la tienda */}
        <div className="navbar-brand">
          <Link to="/" onClick={() => setMenuAbierto(false)}>
            <img src="/logo-utn.png" alt="Logo UTN" className="navbar-logo" />
            <span className="brand-text">UTN Computer Store</span>
          </Link>
        </div>

        {/* Grupo Derecho: Buscador, Enlaces principales y Hamburguesa con espaciado constante */}
        <div className="navbar-right-group">
          <button onClick={toggleTema} className="btn-theme-toggle" aria-label="Cambiar Tema" title="Cambiar Tema">
            {tema === 'dark' ? '☀️' : '🌙'}
          </button>
          
          {usuario && (
            <div className="navbar-search">
              <input 
                type="text"
                placeholder="🔍 Buscar producto..."
                value={busqueda}
                onChange={(e) => {
                    setBusqueda(e.target.value);
                    navigate('/productos');
                }}
              />
            </div>
          )}
          
          <div className="navbar-main-links">
            <Link to="/" onClick={() => setMenuAbierto(false)}>🏠 Inicio</Link>
            <Link to="/acerca-de" onClick={() => setMenuAbierto(false)}>ℹ️ Acerca de</Link>
          </div>

          <div className="navbar-actions">
            {usuario ? (
              <button className="navbar-toggle" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Menú de usuario">
                {menuAbierto ? '✖' : '☰'}
              </button>
            ) : (
              <Link to="/login" className="btn-login">
                🔑 Iniciar Sesión
              </Link>
            )}
          </div>
        </div>

        {/* Menú Lateral Desplegable (Drawer) para acciones del usuario */}
        {usuario && (
          <>
            <div className={`navbar-drawer ${menuAbierto ? 'activo' : ''}`}>
              <button className="drawer-close" onClick={() => setMenuAbierto(false)}>&times;</button>
              
              <div className="drawer-user-info">
                <span className="user-avatar">👤</span>
                <span className="user-greeting">Hola, {usuario.username}</span>
              </div>
              
              <div className="drawer-divider"></div>
              
              <ul className="drawer-links">
                <li onClick={() => setMenuAbierto(false)} className="drawer-only-mobile">
                  <Link to="/">🏠 Inicio</Link>
                </li>
                <li onClick={() => setMenuAbierto(false)} className="drawer-only-mobile">
                  <Link to="/acerca-de">ℹ️ Acerca de</Link>
                </li>
                <li onClick={() => setMenuAbierto(false)}>
                  <Link to="/productos">📦 Catálogo</Link>
                </li>
                <li onClick={() => setMenuAbierto(false)}>
                  <Link to="/carrito" className="cart-link-drawer">
                    🛒 Mi Carrito <span className="cart-badge">{cantidadTotal}</span>
                  </Link>
                </li>
                <li onClick={() => setMenuAbierto(false)}>
                  <Link to="/pedidos">📄 Mis Pedidos</Link>
                </li>
                {usuario.rol === 'ADMIN' && (
                  <li onClick={() => setMenuAbierto(false)} className="admin-link-drawer">
                    <Link to="/gestion" style={{ color: '#ffca28' }}>⚙️ Panel de Gestión</Link>
                  </li>
                )}
              </ul>
              
              <button className="btn-logout" onClick={handleSalir}>
                Cerrar Sesión
              </button>
            </div>
            
            {/* Fondo opaco que cubre el resto de la pantalla al abrir el drawer */}
            {menuAbierto && (
              <div className="drawer-overlay" onClick={() => setMenuAbierto(false)}></div>
            )}
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;