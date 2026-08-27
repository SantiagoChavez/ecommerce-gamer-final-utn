import React from 'react';
import './Footer.css';

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <h4>🎮 UTN Computer Store</h4>
          <p>Tu setup ideal a un clic de distancia.</p>
        </div>

        <div className="footer-section academics">
          <h4>🎓 UTN Avellaneda</h4>
          <p>Tecnicatura Universitaria en Programación</p>
          <p className="author-name">Desarrollado por: Santiago Ezequiel Chavez</p>
        </div>

        <div className="footer-section info">
          <h4>⚙️ Aplicación</h4>
          <p>Versión: <span className="version-badge">v1.1.0</span></p>
          <p>&copy; {anioActual} - Trabajo Integrador Final</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
