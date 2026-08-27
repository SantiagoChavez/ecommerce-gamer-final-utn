<p align="center">
  <img src="frontend/src/assets/logo.jpg" alt="Tienda de Insumos Informáticos UTN" width="600">
</p>

# Trabajo Integrador Final - E-Commerce Fullstack
### Tienda de Insumos Informáticos - UTN Avellaneda


Este proyecto es una aplicación web Fullstack de E-commerce diseñada para una Tienda de Insumos Informáticos. Ofrece una solución integral que abarca desde el catálogo público y carrito de compras para clientes, hasta un panel de administración avanzado (Backoffice) con gestión de stock, control de pedidos, facturación PDF y logística.

Este software fue desarrollado y presentado como el **Trabajo Integrador Final** para aprobar la cursada de la **Tecnicatura Universitaria en Programación** en la **Universidad Tecnológica Nacional (UTN) Facultad Regional Avellaneda**.

---

## 👤 Información del Autor y Académica

* **Autor:** Chavez Santiago Ezequiel
* **Institución:** Universidad Tecnológica Nacional (UTN) - Facultad Regional Avellaneda
* **Carrera:** Tecnicatura Universitaria en Programación
* **Propósito:** Trabajo Integrador Final de Cátedra

---

## 🛠️ Tecnologías Utilizadas

### Backend (API REST)
* ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) **Java 17+**: Lenguaje de programación base.
* ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring&logoColor=white) **Spring Boot 3.x**: Framework principal para el backend y API REST.
* ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) **Spring Data MongoDB**: Mapeo y persistencia de datos NoSQL.
* ![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white) **MongoDB Atlas**: Base de datos NoSQL alojada en la nube.
* ![Apache Maven](https://img.shields.io/badge/Apache_Maven-C71A36?style=flat-square&logo=apache-maven&logoColor=white) **Maven**: Gestión de dependencias y empaquetado del software.

### Frontend (SPA)
* ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) **React 18**: Librería declarativa para interfaces de usuario.
* ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) **Vite**: Servidor de desarrollo y empaquetador ultrarrápido.
* ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) **React Router v6**: Enrutamiento dinámico SPA y rutas protegidas.
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) **CSS3 Moderno**: Estilos personalizados, diseño "Dark Neon", glassmorphism y micro-animaciones.
* 📄 **jsPDF & AutoTable**: Generación dinámica y descarga de comprobantes en PDF.

---

## 🚀 Instalación y Ejecución

### Requisitos Previos
* **Java JDK 17** o superior instalado y configurado en las variables de entorno.
* **Node.js (LTS)** instalado.
* Conexión a Internet (para conectar a la base de datos de MongoDB Atlas en la nube).

### Método de Arranque Rápido (Recomendado para Windows)
El proyecto incluye scripts preparados para levantar automáticamente tanto la base de datos, el backend como el frontend con un solo clic:

1. Haz doble clic sobre el archivo [`lanzarProyecto.vbs`](file:///c:/Users/Santiago/Proyectos%20integradores/ecommerce%20gamer/lanzarProyecto.vbs).
2. Se abrirá un cuadro de diálogo informando el arranque y, tras unos segundos, se abrirá automáticamente tu navegador en `http://localhost:5176` con la aplicación lista para usar.
3. *Alternativamente*, puedes ejecutar el archivo [`start_proyecto.bat`](file:///c:/Users/Santiago/Proyectos%20integradores/ecommerce%20gamer/start_proyecto.bat) en una consola.

### Método Manual (Paso a Paso)

#### Paso 1: Configurar y arrancar el Backend
1. Abre una terminal en la carpeta `/backend`.
2. Compila y ejecuta el backend con Maven:
   ```bash
   mvn spring-boot:run
   ```
   *(El backend estará escuchando en `http://localhost:8080`)*

#### Paso 2: Configurar y arrancar el Frontend
1. Abre otra terminal en la carpeta `/frontend`.
2. Instala las dependencias necesarias (solo la primera vez):
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo de Vite:
   ```bash
   npm run dev
   ```
   *(La web abrirá por defecto en `http://localhost:5176`)*

---

## 🔑 Usuarios de Prueba (Generados Automáticamente)

Al iniciar el backend por primera vez, el sistema creará de forma automática estos usuarios en la base de datos para que puedas probar la aplicación inmediatamente:

| Usuario | Contraseña | Rol / Permisos | Acceso Permitido |
| :--- | :--- | :--- | :--- |
| **admin** | `1234` | `ADMIN` | Catálogo de compra + Acceso exclusivo al Panel de Gestión (`/gestion`) |
| **cliente** | `1234` | `USER` | Catálogo, añadir al carrito, realizar compras e historial de pedidos |

---

## 📂 Estructura del Proyecto

```text
ecommerce-gamer/
│
├── backend/                              # Servidor Spring Boot
│   ├── src/main/java/com/entregaFinal/gestion/
│   │   ├── controller/                   # Endpoints (Auth, Pedidos, Productos)
│   │   ├── model/                        # Entidades de MongoDB (Documentos)
│   │   ├── repository/                   # Interfaces de acceso a datos (Spring Data)
│   │   ├── service/                      # Lógica de negocio (Gestión de stock, validaciones)
│   │   └── PreentregaJavaGestionApplication.java  # Clase principal
│   └── src/main/resources/
│       └── application.properties        # Configuración del servidor y base de datos Atlas
│
├── frontend/                             # Cliente React (SPA)
│   ├── src/
│   │   ├── components/                   # Componentes de UI (Admin, Pedidos, Carrito, etc.)
│   │   ├── context/                      # Contexto global y notificaciones
│   │   ├── utils/                        # Generador de Facturas en PDF
│   │   └── App.jsx                       # Configuración de Router y Rutas
│   ├── public/                           # Assets estáticos
│   └── package.json                      # Scripts y dependencias de Node
│
├── lanzarProyecto.vbs                    # Lanzador invisible para Windows
├── start_proyecto.bat                    # Script batch de arranque ordenado
└── README.md                             # Documentación del proyecto
```

---

## 📈 Historial de Cambios (Changelog)

El registro detallado de las versiones, cambios aplicados y el roadmap de desarrollo continuo se encuentra documentado por separado en el archivo [changelog.md](changelog.md).
