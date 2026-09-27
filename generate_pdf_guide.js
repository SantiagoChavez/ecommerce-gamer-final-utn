const { jsPDF } = require('./frontend/node_modules/jspdf');
const autoTableModule = require('./frontend/node_modules/jspdf-autotable');
const autoTable = autoTableModule.default || autoTableModule;
const fs = require('fs');
const path = require('path');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();

// Paleta de colores UTN Dark & Neon
const primaryDark = [15, 23, 42];       // #0f172a
const accentBlue = [14, 165, 233];      // #0ea5e9
const accentNeon = [6, 182, 212];       // #06b6d4
const textDark = [30, 41, 59];          // #1e293b
const textMuted = [100, 116, 139];      // #64748b
const codeBg = [241, 245, 249];         // #f1f5f9
const codeText = [15, 23, 42];

let y = 20;

function checkPageBreak(neededSpace = 25) {
  if (y + neededSpace > pageHeight - 20) {
    addFooter();
    doc.addPage();
    y = 25;
    addHeaderBanner();
  }
}

function addHeaderBanner() {
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 12, 'F');
  doc.setFillColor(14, 165, 233);
  doc.rect(0, 11.5, pageWidth, 0.8, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('UTN AVELLANEDA | TECNICATURA UNIVERSITARIA EN PROGRAMACIÓN', 14, 7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(14, 165, 233);
  doc.text('GUÍA DIDÁCTICA DOCKER & DOCKER COMPOSE', pageWidth - 14, 7.5, { align: 'right' });
}

function addFooter() {
  const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, pageHeight - 12, pageWidth - 14, pageHeight - 12);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...textMuted);
  doc.text('Trabajo Integrador Final - Santiago Ezequiel Chavez', 14, pageHeight - 7);
  doc.text(`Página ${pageCurrent}`, pageWidth - 14, pageHeight - 7, { align: 'right' });
}

function drawSectionTitle(number, title) {
  checkPageBreak(25);
  y += 4;
  doc.setFillColor(14, 165, 233);
  doc.roundedRect(14, y, 6, 6, 1, 1, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(String(number), 17, y + 4.3, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(...primaryDark);
  doc.text(title, 23, y + 4.8);
  
  y += 10;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y - 2, pageWidth - 14, y - 2);
}

function drawSubTitle(subtitle) {
  checkPageBreak(15);
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(14, 165, 233);
  doc.text(subtitle, 14, y);
  y += 5.5;
}

function drawParagraph(text, spacing = 4) {
  checkPageBreak(12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...textDark);
  const splitText = doc.splitTextToSize(text, pageWidth - 28);
  doc.text(splitText, 14, y);
  y += (splitText.length * 4.3) + spacing;
}

function drawCodeBlock(codeLines, label = '') {
  const lineH = 3.9;
  const padding = 3.5;
  const boxH = (codeLines.length * lineH) + (padding * 2) + (label ? 4.5 : 0);
  
  checkPageBreak(boxH + 6);
  
  doc.setFillColor(...codeBg);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, pageWidth - 28, boxH, 2, 2, 'FD');
  
  let currentY = y + padding + 3;
  if (label) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(14, 165, 233);
    doc.text(label.toUpperCase(), 18, currentY);
    currentY += 4.2;
  }
  
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...codeText);
  
  for (const line of codeLines) {
    doc.text(line, 18, currentY);
    currentY += lineH;
  }
  
  y += boxH + 4;
}

function drawHighlightCard(title, description, color = [14, 165, 233]) {
  checkPageBreak(22);
  const textLines = doc.splitTextToSize(description, pageWidth - 36);
  const cardH = (textLines.length * 4) + 11;
  
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, cardH, 2, 2, 'FD');
  
  doc.setFillColor(...color);
  doc.roundedRect(14, y, 2.5, cardH, 1, 1, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...color);
  doc.text(title, 20, y + 5);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...textDark);
  doc.text(textLines, 20, y + 9.5);
  
  y += cardH + 4;
}

// ==========================================
// PORTADA / ENCABEZADO PRINCIPAL (PÁGINA 1)
// ==========================================
addHeaderBanner();
y = 20;

// Portada Header Box
doc.setFillColor(15, 23, 42);
doc.roundedRect(14, y, pageWidth - 28, 38, 3, 3, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(15);
doc.setTextColor(255, 255, 255);
doc.text('GUÍA TÉCNICA DE CONTENEDORIZACIÓN', pageWidth / 2, y + 11, { align: 'center' });

doc.setFontSize(11);
doc.setTextColor(6, 182, 212);
doc.text('Docker & Docker Compose para E-Commerce Gamer Fullstack', pageWidth / 2, y + 18, { align: 'center' });

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(203, 213, 225);
doc.text('Trabajo Integrador Final | UTN FR Avellaneda | Tecnicatura en Programación', pageWidth / 2, y + 26, { align: 'center' });
doc.text('Autor: Santiago Ezequiel Chavez | Versión: 1.2.0 (Septiembre 2026)', pageWidth / 2, y + 32, { align: 'center' });

y += 44;

// SECCIÓN 1: INTRODUCCIÓN
drawSectionTitle(1, '¿Qué es Docker y por qué lo implementamos?');
drawParagraph('Docker es una plataforma de virtualización a nivel de sistema operativo que permite empaquetar una aplicación junto con todas sus dependencias (código, runtime de Java, Node, servidor Nginx, librerías y configuraciones) dentro de una unidad estandarizada y aislada llamada Contenedor.');

drawHighlightCard(
  '💡 El Problema del "En mi máquina sí funciona"',
  'Tradicionalmente, para correr este proyecto un evaluador debía instalar Java 21, Maven, Node.js, configurar variables de entorno en Windows y lidiar con conflictos de versiones. Con Docker, la aplicación corre de forma idéntica en cualquier máquina (Windows, Linux, macOS) garantizando Cero Fricción y reproducible al 100%.',
  [14, 165, 233]
);

drawParagraph('Conceptos Fundamentales que debes dominar:');

autoTable(doc, {
  startY: y,
  margin: { left: 14, right: 14 },
  head: [['Concepto', 'Definición', 'Analogía en Programación']],
  body: [
    ['Dockerfile', 'Archivo de texto con instrucciones paso a paso para construir una imagen.', 'Es como una Clase (Molde o Blueprint).'],
    ['Imagen Docker', 'Paquete inmutable y autocontenido con el código, runtime y librerías.', 'Es como el binario compilado (.exe / .jar).'],
    ['Contenedor', 'Instancia viva en ejecución y aislada de una imagen Docker.', 'Es como un Objeto instanciado en memoria.'],
    ['Docker Compose', 'Herramienta para orquestar y coordinar múltiples contenedores interconectados.', 'El archivo "main" que levanta backend y frontend juntos.'],
  ],
  headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
  bodyStyles: { fontSize: 7.5, textColor: [30, 41, 59] },
  alternateRowStyles: { fillColor: [248, 250, 252] },
  theme: 'grid',
});

y = doc.lastAutoTable.finalY + 6;

// SECCIÓN 2: ARQUITECTURA DEL PROYECTO
drawSectionTitle(2, 'Arquitectura de Contenedores del E-Commerce');
drawParagraph('El ecosistema está orquestado mediante 2 servicios en contenedores independientes que interactúan con la base de datos en la nube:');

autoTable(doc, {
  startY: y,
  margin: { left: 14, right: 14 },
  head: [['Servicio', 'Tecnología', 'Puerto Interno', 'Puerto Expuesto', 'Propósito']],
  body: [
    ['ecommerce-backend', 'Spring Boot 3 + JRE 21 Alpine', '8080', '8080', 'API REST, persistencia NoSQL, validación de stock'],
    ['ecommerce-frontend', 'React 18 + Vite + Nginx Alpine', '80', '5176', 'SPA, catálogo gamer, routing de vistas, carrito y PDF'],
    ['MongoDB Atlas', 'Cluster Cloud NoSQL', '27017', 'En la nube', 'Persistencia permanente y distribuida de datos']
  ],
  headStyles: { fillColor: [14, 165, 233], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
  bodyStyles: { fontSize: 7.5, textColor: [30, 41, 59] },
  alternateRowStyles: { fillColor: [248, 250, 252] },
  theme: 'grid'
});

y = doc.lastAutoTable.finalY + 6;

// SECCIÓN 3: DETALLE DEL BACKEND DOCKERFILE
drawSectionTitle(3, 'Desglose del Dockerfile del Backend (Multi-Stage Build)');
drawParagraph('Para que el contenedor sea liviano y seguro, utilizamos el patrón Multi-Stage Build (Construcción en Múltiples Etapas):');

drawCodeBlock([
  '# ETAPA 1: COMPILACIÓN CON MAVEN (Descarta después)',
  'FROM maven:3.9.6-eclipse-temurin-21-alpine AS build',
  'WORKDIR /app',
  'COPY pom.xml .',
  'RUN mvn dependency:go-offline -B  # Guarda dependencias en caché',
  'COPY src ./src',
  'RUN mvn clean package -DskipTests # Genera el archivo .jar',
  '',
  '# ETAPA 2: IMAGEN FINAL LIGERA (SOLO RUNTIME JRE 21)',
  'FROM eclipse-temurin:21-jre-alpine',
  'WORKDIR /app',
  'RUN addgroup -S appgroup && adduser -S appuser -G appgroup',
  'USER appuser                     # Usuario sin privilegios por seguridad',
  'COPY --from=build /app/target/*.jar app.jar',
  'EXPOSE 8080',
  'ENTRYPOINT ["java", "-jar", "app.jar"]'
], 'backend/Dockerfile');

drawHighlightCard(
  '🎯 ¿Por qué es fundamental el Multi-Stage Build?',
  'Maven y el JDK completo superan los 600MB. Con Multi-Stage Build, el contenedor final SOLO contiene el JRE ligero (menos de 150MB) y el JAR compilado. El código fuente original y el compilador Maven se descartan, reduciendo drásticamente la superficie de ataque y el uso de memoria.',
  [16, 185, 129]
);

// SECCIÓN 4: DETALLE DEL FRONTEND DOCKERFILE Y NGINX
drawSectionTitle(4, 'Desglose del Dockerfile del Frontend y Nginx');
drawParagraph('En producción no usamos el servidor de desarrollo de Vite. En su lugar, generamos los archivos estáticos HTML/JS/CSS y los servimos con Nginx:');

drawCodeBlock([
  '# ETAPA 1: BUILD ESTÁTICO DE REACT',
  'FROM node:20-alpine AS build',
  'WORKDIR /app',
  'COPY package*.json ./',
  'RUN npm install',
  'COPY . .',
  'RUN npm run build               # Genera la carpeta /dist optimizada',
  '',
  '# ETAPA 2: SERVIDOR NGINX ALPINE ULTRA LIVIANO',
  'FROM nginx:alpine',
  'WORKDIR /usr/share/nginx/html',
  'RUN rm -rf ./*',
  'COPY --from=build /app/dist .',
  'COPY nginx.conf /etc/nginx/conf.d/default.conf',
  'EXPOSE 80',
  'CMD ["nginx", "-g", "daemon off;"]'
], 'frontend/Dockerfile');

drawSubTitle('¿Por qué necesitamos frontend/nginx.conf? (El problema del SPA Routing)');
drawParagraph('En las aplicaciones SPA de React Router, al recargar en rutas como "/gestion" o "/pedidos", el navegador le pide al servidor ese archivo físico. Si Nginx no está configurado, devolvería un error 404. La directiva try_files redirige todas las rutas a index.html para que React maneje la navegación:');

drawCodeBlock([
  'server {',
  '    listen 80;',
  '    location / {',
  '        root /usr/share/nginx/html;',
  '        index index.html;',
  '        try_files $uri $uri/ /index.html;  # Soluciona 404 en rutas React',
  '    }',
  '}'
], 'frontend/nginx.conf');

// SECCIÓN 5: ORQUESTACIÓN CON DOCKER COMPOSE
drawSectionTitle(5, 'Orquestación con docker-compose.yml');
drawParagraph('Docker Compose permite coordinar ambos contenedores, configurar puertos, variables de entorno y orden de inicio con un único comando:');

drawCodeBlock([
  'services:',
  '  backend:',
  '    build: ./backend',
  '    container_name: ecommerce-gamer-backend',
  '    ports:',
  '      - "8080:8080"               # [Puerto en tu PC]:[Puerto en el contenedor]',
  '    environment:',
  '      - SPRING_DATA_MONGODB_URI=mongodb+srv://... (MongoDB Atlas)',
  '      - CORS_ALLOWED_ORIGINS=http://localhost:5176,http://localhost:80',
  '    restart: unless-stopped',
  '',
  '  frontend:',
  '    build: ./frontend',
  '    container_name: ecommerce-gamer-frontend',
  '    ports:',
  '      - "5176:80"                 # Mapea el puerto 80 de Nginx al 5176',
  '    depends_on:',
  '      - backend                   # Garantiza que el backend inicie primero',
  '    restart: unless-stopped'
], 'docker-compose.yml');

// SECCIÓN 6: COMANDOS ESENCIALES
drawSectionTitle(6, 'Guía Rápida de Comandos (Docker Cheatsheet)');

autoTable(doc, {
  startY: y,
  margin: { left: 14, right: 14 },
  head: [['Comando', 'Descripción']],
  body: [
    ['docker compose up --build', 'Compila las imágenes y levanta todos los contenedores mostrando logs.'],
    ['docker compose up -d', 'Levanta los contenedores en segundo plano (modo detached).'],
    ['docker compose ps', 'Muestra el estado de salud y puertos de los contenedores.'],
    ['docker compose logs -f', 'Sigue los logs en tiempo real de todos los servicios.'],
    ['docker compose down', 'Detiene y destruye los contenedores de forma limpia.'],
    ['docker images', 'Lista todas las imágenes descargadas y construidas en el equipo.'],
    ['docker exec -it <nombre> sh', 'Abre una consola dentro del contenedor en ejecución.']
  ],
  headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
  bodyStyles: { fontSize: 7.5, textColor: [30, 41, 59] },
  alternateRowStyles: { fillColor: [248, 250, 252] },
  theme: 'grid'
});

y = doc.lastAutoTable.finalY + 6;

// Resumen Final
drawHighlightCard(
  '🎓 Valor Académico para la Evaluación Final',
  'La contenedorización demuestra dominio en DevOps, microservicios, seguridad no-root, optimización de imágenes (Multi-stage) y servidores de producción (Nginx). Esto ubica el proyecto en un nivel profesional y competitivo.',
  [6, 182, 212]
);

// Aplicar Headers y Footers en todas las páginas generadas
const totalPages = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
  doc.setPage(i);
  addHeaderBanner();
  addFooter();
}

const outputPath = path.join(__dirname, 'Guia_Docker_Ecommerce_Gamer_UTN.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outputPath, pdfBuffer);
console.log('PDF generado exitosamente en:', outputPath);
