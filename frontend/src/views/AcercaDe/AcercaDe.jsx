import React from 'react';
import './AcercaDe.css';

function AcercaDe() {
  return (
    <div className="acercade-container">
      <div className="acercade-card">
        <h1 className="acercade-title">ℹ️ Acerca del Proyecto</h1>
        <p className="acercade-subtitle">Trabajo Integrador Final - UTN FR Avellaneda</p>

        <div className="acercade-divider"></div>

        <section className="acercade-section">
          <h3>🎓 Contexto Académico</h3>
          <p>
            Esta aplicación fue desarrollada como el proyecto integrador de fin de carrera para la 
            <strong> Tecnicatura Universitaria en Programación</strong> de la <strong>Universidad Tecnológica Nacional (UTN)</strong>, 
            Facultad Regional Avellaneda. 
          </p>
          <p>
            El objetivo del proyecto es consolidar los conocimientos adquiridos en programación orientada a objetos, bases de datos NoSQL, 
            desarrollo de APIs REST, y construcción de arquitecturas frontend modernas tipo SPA.
          </p>
        </section>

        <section className="acercade-section">
          <h3>💻 Perfil del Desarrollador</h3>
          <div className="developer-profile">
            <div className="dev-avatar">🎮</div>
            <div className="dev-info">
              <h4>Santiago Chavez</h4>
              <p className="dev-title">FullStack Developer</p>
              <p className="dev-bio">
                Estudiante graduado de la TUP (UTN) y egresado de Bootcamp de Henry. Apasionado por la tecnología, 
                la optimización de software y el desarrollo de interfaces responsivas y atractivas.
              </p>
            </div>
          </div>
        </section>

        <section className="acercade-section">
          <h3>🛠️ Arquitectura y Tecnologías</h3>
          <div className="tech-grid">
            <div className="tech-item">
              <span className="tech-icon">🌱</span>
              <strong>Backend REST API</strong>
              <p>Construido con Java 17, Spring Boot 3.x, JPA y Spring Data.</p>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🍃</span>
              <strong>Base de Datos</strong>
              <p>MongoDB Atlas en la nube para almacenamiento de documentos flexible y escalable.</p>
            </div>
            <div className="tech-item">
              <span className="tech-icon">⚛️</span>
              <strong>Frontend SPA</strong>
              <p>React 18 con Vite, utilizando React Router v6 para enrutamiento dinámico.</p>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🎨</span>
              <strong>Diseño & UX</strong>
              <p>Estilos CSS3 puros con temática "Dark Neon", efectos de glassmorphism y adaptabilidad móvil.</p>
            </div>
          </div>
        </section>

        <section className="acercade-section features-list">
          <h3>📦 Funcionalidades Destacadas</h3>
          <ul>
            <li>🔐 <strong>Control de Roles:</strong> Vistas diferenciadas y rutas protegidas para Clientes (USER) y Administradores (ADMIN).</li>
            <li>🛒 <strong>Carrito de Compras:</strong> Carrito reactivo persistente en LocalStorage con validación de stock en tiempo real.</li>
            <li>📈 <strong>Backoffice Administrativo:</strong> Panel completo de CRUD de productos con edición "in-line" y gestión de pedidos masiva.</li>
            <li>📄 <strong>Facturación PDF:</strong> Generación y descarga automatizada de facturas PDF profesionales directamente en el cliente.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AcercaDe;
