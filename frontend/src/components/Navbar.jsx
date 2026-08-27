import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ usuario, onLogout, carrito, busqueda, setBusqueda }) {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleSalir = () => {
    onLogout();
    navigate('/');
    setMenuAbierto(false);
  };

  const cantidadTotal = carrito ? carrito.reduce((acc, item) => acc + item.cantidad, 0) : 0;

  return (
    <nav className="navbar">
      {/* Logo/Marca de la tienda */}
      <div className="navbar-brand">
        <Link to="/" onClick={() => setMenuAbierto(false)}>
          🎮 <span className="brand-text">UTN Computer Store</span>
        </Link>
      </div>

      {/* Botón hamburguesa para dispositivos móviles */}
      <button className="navbar-toggle" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Menú de navegación">
        {menuAbierto ? '✖' : '☰'}
      </button>

      {/* Menú de navegación */}
      <ul className={`navbar-menu ${menuAbierto ? 'activo' : ''}`}>
        {/* Siempre visible: Inicio */}
        <li onClick={() => setMenuAbierto(false)}>
          <Link to="/">🏠 Inicio</Link>
        </li>
        
        {/* --- SOLO VISIBLE SI HAY USUARIO --- */}
        {usuario && (
          <>
            <li onClick={() => setMenuAbierto(false)}>
              <Link to="/productos">📦 Catálogo</Link>
            </li>

            {/* BARRA DE BÚSQUEDA (Solo para usuarios) */}
            <li className="navbar-search">
              <input 
                type="text"
                placeholder="🔍 Buscar producto..."
                value={busqueda}
                onChange={(e) => {
                    setBusqueda(e.target.value);
                    navigate('/productos');
                }}
              />
            </li>

            <li onClick={() => setMenuAbierto(false)}>
              <Link to="/carrito" className="cart-link">
                🛒 <span className="cart-badge">{cantidadTotal}</span>
              </Link>
            </li>
            
            <li onClick={() => setMenuAbierto(false)}>
              <Link to="/pedidos">📄 Mis Pedidos</Link>
            </li>
          </>
        )}

        {/* --- LADO DERECHO (LOGIN / LOGOUT) --- */}
        {usuario ? (
          <>
            {usuario.rol === 'ADMIN' && (
              <li onClick={() => setMenuAbierto(false)} className="admin-link">
                  <Link to="/gestion" style={{ color: '#ffca28' }}>⚙️ Gestión</Link>
              </li>
            )}
            
            <li className="user-greeting">
              <span>Hola, {usuario.username}</span>
              <button onClick={handleSalir} className="btn-logout">
                Salir
              </button>
            </li>
          </>
        ) : (
          <li onClick={() => setMenuAbierto(false)} className="login-link">
            <Link to="/login" className="btn-login">
              🔑 Iniciar Sesión
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;