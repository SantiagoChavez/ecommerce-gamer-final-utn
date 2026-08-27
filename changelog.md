# Changelog (Historial de Cambios)

Historial de cambios y mejoras continuas aplicadas sobre el Trabajo Integrador Final de la **Tecnicatura Universitaria en Programación (UTN)**.

---

## [v1.1.5] - 2026-08-27 (En progreso)

### Añadido
* **Sección "Acerca de" (`AcercaDe`):** Creación de una página académica formal detallando el contexto de la carrera en la UTN FR Avellaneda, el perfil del desarrollador (`Santiago Chavez Dev`) y las especificaciones de arquitectura del sistema.
* **Menú Lateral Desplegable (Drawer):** Agrupación estética de accesos secundarios (Catálogo, Carrito, Mis Pedidos, Gestión, Saludo y Cierre de Sesión) en un cajón lateral deslizante activado por un botón hamburguesa (`☰`).
* **Soporte de Navegación en Móviles:** Integración dinámica de los accesos principales (`Inicio` y `Acerca de`) dentro del Drawer cuando se navega en dispositivos de pantallas reducidas.
* **Logo UTN Centrado y Optimizado:** Procesamiento digital de la imagen `logo-utn.png` con un script Python (Pillow) para remover textos duplicados en su base y centrar el tridente con márgenes equilibrados.

### Modificado
* **Estructura Centrada del Header y Footer:** Envoltura del contenido interior de la barra de navegación y del pie de página en contenedores con un ancho máximo de `1000px` (`max-width: 1000px`), logrando que se alineen perfectamente con los bordes de la tarjeta central.
* **Reorganización del Navbar:** Ubicación prioritaria del buscador de productos inmediatamente después del logotipo, mejorando la usabilidad.
* **Ajuste de Alturas y Eliminación de Scroll:** Rediseño del alto de la pantalla de Inicio (`calc(100vh - 90px)`) y traslado de los espaciados inferiores exclusivamente a vistas extensas, previniendo la barra de desplazamiento vertical en el Landing.

---

## [v1.1.0] - 2026-08-26

### Añadido
* **Conexión a MongoDB Atlas en la Nube:** Reemplazo de la base de datos de desarrollo local por una URI de producción persistente en un cluster en la nube.
* **Portabilidad mediante Scripts Relativos:** Corrección en `lanzarProyecto.vbs` y `start_proyecto.bat` para evitar problemas con rutas de Windows que contengan espacios.
* **Detección Inteligente de Compilador:** Solución al conflicto del PATH de Windows con marcadores de 0 bytes de Maven, forzando la ruta real del archivo ejecutable.
* **Formato de Documentación:** Refactorización completa del README al estándar Markdown formal con insignias tecnológicas estéticas.
