# Changelog (Historial de Cambios)

Historial de cambios y mejoras continuas aplicadas sobre el Trabajo Integrador Final de la **Tecnicatura Universitaria en Programación (UTN)**.

---

## [v1.2.0] - 2026-09-27

### Añadido
* **Despliegue Completo en la Nube (Cloud Deploy):** Puesta en producción pública de la aplicación Fullstack con Frontend alojado en **Vercel** (Edge CDN) y Backend contenerizado alojado en **Render** conectado a **MongoDB Atlas**.
* **Contenedorización con Docker:** Creación de `Dockerfile` multi-etapa optimizados para el Backend (`maven:3.9.6` para compilar y `eclipse-temurin:21-jre-alpine` para ejecución con usuario no-root) y Frontend (`node:20-alpine` para build y `nginx:alpine` para producción).
* **Orquestación con Docker Compose (`docker-compose.yml`):** Configuración lista para levantar todo el ecosistema (Backend + Frontend + Atlas) con el comando estándar `docker compose up --build`.
* **Configuración de Nginx para SPA (`nginx.conf`):** Manejo de rutas virtuales de React Router (`try_files $uri /index.html`) y encabezados de caché para optimizar la carga de assets estáticos.
* **Módulo Centralizado de API (`api.js`):** Creación de `frontend/src/config/api.js` para desacoplar las URLs de los endpoints y soportar variables de entorno (`VITE_API_URL`) para entornos de desarrollo local, Docker y producción en la nube.
* **Soporte de CORS Dinámico y Multi-Origen en Spring Boot:** Configuración mediante `@Value` y variables de entorno (`CORS_ALLOWED_ORIGINS`) en `WebConfig.java` y `application.properties` para soportar dominios de Vercel y Render.
* **Documentación Técnica en PDF:** Generación automatizada de [`Guia_Docker_Ecommerce_Gamer_UTN.pdf`](Guia_Docker_Ecommerce_Gamer_UTN.pdf) e [`Informe_Arquitectura_Docker_vs_JobFlow_UTN.pdf`](Informe_Arquitectura_Docker_vs_JobFlow_UTN.pdf) con análisis comparativo de arquitecturas.
* **Sección de Resolución de Errores y Bugs en README:** Documentación detallada sobre troubleshooting de Docker PATH, routing SPA en Nginx, cold start en Render y control de concurrencia de stock.

### Solucionado
* **Resolución de Error 404 en Recarga de Páginas SPA:** Configuración de fallback en Nginx para redirigir peticiones a `index.html`.
* **Bloqueo de CORS en Producción:** Habilitación de patrones dinámicos (`allowedOriginPatterns`) para aceptar orígenes de Vercel y Render en simultáneo con localhost.

---

## [v1.1.5] - 2026-08-27

### Añadido
* **Suite de Pruebas Unitarias (Vitest):** Configuración de infraestructura de pruebas unitarias y de interacción con JSDOM y React Testing Library en el frontend. Escritura de 13 pruebas unitarias y casos borde para `ThemeContext`, `Navbar` y `Carrito`.
* **Semillado Automático de Productos:** Lógica de carga automática en el arranque del backend para insertar 6 productos gamer de prueba con imágenes reales de alta resolución si la colección de la base de datos de MongoDB Atlas está vacía.
* **Sección "Acerca de" (`AcercaDe`):** Creación de una página académica formal detallando el contexto de la carrera en la UTN FR Avellaneda, el perfil del desarrollador (`Santiago Chavez Dev`) y las especificaciones de arquitectura del sistema.
* **Menú Lateral Desplegable (Drawer):** Agrupación estética de accesos secundarios (Catálogo, Carrito, Mis Pedidos, Gestión, Saludo y Cierre de Sesión) en un cajón lateral deslizante activado por un botón hamburguesa (`☰`).
* **Soporte de Navegación en Móviles:** Integración dinámica de los accesos principales (`Inicio` y `Acerca de`) dentro del Drawer cuando se navega en dispositivos de pantallas reducidas.
* **Logo UTN Centrado y Optimizado:** Procesamiento digital de la imagen `logo-utn.png` con un script Python (Pillow) para remover textos duplicados en su base y centrar el tridente con márgenes equilibrados.

### Modificado
* **Estructura de Carpetas del Proyecto:** Refactorización física de carpetas del backend (paquete `config/` para alojar CORS e inicializador) y frontend (componentes en subcarpetas independientes "Component Folders" y vistas principales agrupadas en `/src/views/`), actualizando de forma segura todos los imports.
* **Estructura Centrada del Header y Footer:** Envoltura del contenido interior de la barra de navegación y del pie de página en contenedores con un ancho máximo de `1000px` (`max-width: 1000px`), logrando que se alinee perfectamente con los bordes de la tarjeta central.
* **Reorganización del Navbar:** Ubicación prioritaria del buscador de productos inmediatamente después del logotipo, mejorando la usabilidad.
* **Ajuste de Alturas y Eliminación de Scroll:** Rediseño del alto de la pantalla de Inicio (`calc(100vh - 90px)`) y traslado de los espaciados inferiores exclusivamente a vistas extensas, previniendo la barra de desplazamiento vertical en el Landing.

### Solucionado
* **Warnings de Compilación de Java (Null Type Safety):** Supresión de 8 advertencias de seguridad sobre el manejo de tipos de datos nulos en `WebConfig`, `ProductoService` y `DataInitializer` mediante el decorador `@SuppressWarnings("null")`.

---

## [v1.1.0] - 2026-08-26

### Añadido
* **Conexión a MongoDB Atlas en la Nube:** Reemplazo de la base de datos de desarrollo local por una URI de producción persistente en un cluster en la nube.
* **Portabilidad mediante Scripts Relativos:** Corrección en `lanzarProyecto.vbs` y `start_proyecto.bat` para evitar problemas con rutas de Windows que contengan espacios.
* **Detección Inteligente de Compilador:** Solución al conflicto del PATH de Windows con marcadores de 0 bytes de Maven, forzando la ruta real del archivo ejecutable.
* **Formato de Documentación:** Refactorización completa del README al estándar Markdown formal con insignias tecnológicas estéticas.
