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

// Colores Institucionales y de Diseño
const primaryDark = [15, 23, 42];       // #0f172a (Azul noche profundo)
const accentBlue = [14, 165, 233];      // #0ea5e9 (Azul cian)
const accentNeon = [6, 182, 212];       // #06b6d4 (Neón)
const accentPurple = [139, 92, 246];    // #8b5cf6 (Púrpura moderno)
const textDark = [30, 41, 59];          // #1e293b (Texto principal)
const textMuted = [100, 116, 139];      // #64748b (Texto secundario)
const codeBg = [241, 245, 249];         // #f1f5f9
const codeText = [15, 23, 42];

let y = 20;

function checkPageBreak(neededSpace = 25) {
  if (y + neededSpace > pageHeight - 20) {
    doc.addPage();
    y = 25;
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
  doc.text('INFORME TÉCNICO: DOCKER vs DEPLOY NATIVO (JOBFLOW)', pageWidth - 14, 7.5, { align: 'right' });
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
// PÁGINA 1: PORTADA Y FUNDAMENTOS
// ==========================================
y = 20;

// Portada Header Box
doc.setFillColor(15, 23, 42);
doc.roundedRect(14, y, pageWidth - 28, 40, 3, 3, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(15);
doc.setTextColor(255, 255, 255);
doc.text('INFORME TÉCNICO DE ARQUITECTURA', pageWidth / 2, y + 11, { align: 'center' });

doc.setFontSize(11);
doc.setTextColor(6, 182, 212);
doc.text('Contenedorización con Docker vs Despliegue Nativo (JobFlow)', pageWidth / 2, y + 19, { align: 'center' });

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(203, 213, 225);
doc.text('Trabajo Integrador Final | UTN FR Avellaneda | Tecnicatura Universitaria en Programación', pageWidth / 2, y + 27, { align: 'center' });
doc.text('Autor: Santiago Ezequiel Chavez | Septiembre 2026', pageWidth / 2, y + 33, { align: 'center' });

y += 46;

// SECCIÓN 1: DOCKER EN EL E-COMMERCE
drawSectionTitle(1, '¿Por qué se incorporó Docker en el E-Commerce Gamer?');
drawParagraph('El proyecto E-Commerce Gamer es una solución Fullstack heterogénea (políglota): combina un backend en Java 21 con Spring Boot 3, un frontend SPA en React 18 / Vite, un servidor web Nginx y persistencia NoSQL en MongoDB Atlas.');

drawHighlightCard(
  '🎯 El Propósito Principal de Docker en este Proyecto',
  'Garantizar que el sistema completo pueda compilarse, configurarse y ejecutarse de forma 100% idéntica en cualquier computadora o servidor (Windows, Linux, macOS o Render en la nube) con un único comando, eliminando toda dependencia manual de JDK, Node.js o Maven en el host.',
  [14, 165, 233]
);

drawParagraph('Conceptos Fundamentales aplicados en el E-Commerce:');

autoTable(doc, {
  startY: y,
  margin: { left: 14, right: 14 },
  head: [['Elemento', 'Función en el E-Commerce', 'Beneficio Técnico']],
  body: [
    ['backend/Dockerfile', 'Compila con Maven y ejecuta el JAR en JRE 21 Alpine.', 'Multi-stage: Reduce el peso de 600MB a 150MB y añade seguridad no-root.'],
    ['frontend/Dockerfile', 'Compila React con Vite y lo monta en Nginx Alpine.', 'Multi-stage: No requiere Node en ejecución; Nginx sirve estáticos a alta velocidad.'],
    ['frontend/nginx.conf', 'Servidor web HTTP con regla try_files $uri /index.html.', 'Elimina los errores 404 al recargar rutas de React Router (SPA).'],
    ['docker-compose.yml', 'Orquestador multi-contenedor con red interna y puertos.', 'Levanta Backend (8080) y Frontend (5176) sincronizados con 1 solo comando.']
  ],
  headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
  bodyStyles: { fontSize: 7.5, textColor: [30, 41, 59] },
  alternateRowStyles: { fillColor: [248, 250, 252] },
  theme: 'grid'
});

y = doc.lastAutoTable.finalY + 8;

// SECCIÓN 2: COMPARACIÓN CON JOBFLOW
drawSectionTitle(2, 'Comparación de Despliegue: E-Commerce Gamer vs JobFlow');
drawParagraph('En tu dashboard de Render tienes actualmente dos proyectos con estrategias de despliegue y tecnologías completamente distintas. Comprender esta diferencia es clave para tu formación profesional:');

drawSubTitle('1. ¿Cómo está desplegado JobFlow? (Despliegue Nativo con Buildpack de Node)');
drawParagraph('JobFlow es una API desarrollada en Node.js / Express. En Render seleccionaste el runtime "Node".');
drawParagraph('• Cómo funciona: Render provee una máquina virtual estándar con Node y npm preinstalados. Render ejecuta "npm install" y luego "npm start" directamente sobre su sistema operativo.');
drawParagraph('• Ventaja: Es muy rápido y simple de configurar para aplicaciones puramente en JavaScript/TypeScript.');
drawParagraph('• Limitación: Estás atado a las versiones de Node y librerías del sistema que Render ofrece. Si tu proyecto fuera en Java o necesitara Nginx, el runtime de Node no sirve.');

drawSubTitle('2. ¿Cómo está desplegado el E-Commerce Gamer? (Despliegue con Docker / Contenedores)');
drawParagraph('El E-Commerce utiliza el runtime "Docker" en Render para el Backend y "Vercel CDN" para el Frontend.');
drawParagraph('• Cómo funciona: Render no intenta adivinar el lenguaje ni usar sus paquetes nativos. Simplemente toma tu "Dockerfile", descarga la imagen oficial de Java 21 Alpine, compila el código adentro y levanta el contenedor aislado.');
drawParagraph('• Ventaja: Independencia absoluta. El mismo Dockerfile corre en Render, en tu PC local con Docker Desktop, en AWS, en Azure o en Google Cloud sin cambiar una sola coma.');

y += 2;

// TABLA COMPARATIVA EXHAUSTIVA
drawSubTitle('Cuadro Comparativo Detallado');

autoTable(doc, {
  startY: y,
  margin: { left: 14, right: 14 },
  head: [['Criterio', 'JobFlow (Deploy Nativo Node)', 'E-Commerce Gamer (Deploy con Docker)']],
  body: [
    ['Tecnología', 'Node.js / Express (Monolenguaje)', 'Java 21 Spring Boot + React 18 + Nginx (Políglota)'],
    ['Entorno de Ejecución', 'Entorno administrado por Render (Buildpack)', 'Contenedor Linux Alpine personalizado e inmutable'],
    ['Control de Versiones', 'Limitado a las versiones de Node de Render', 'Control total: Java 21, Maven 3.9, Node 20, Nginx Alpine'],
    ['Portabilidad Cloud', 'Acoplado a plataformas que soporten Node', '100% portable a cualquier nube (AWS, GCP, Azure, etc.)'],
    ['Ejecución Local', 'Requiere Node instalado en la máquina local', 'Se levanta con "docker compose up" sin instalar Java ni Node'],
    ['Aislamiento y Seguridad', 'Comparte dependencias del sistema anfitrión', 'Aislado en sandbox con usuario no-root por seguridad'],
    ['Optimización de Peso', 'Sube la carpeta con todas las dependencias', 'Multi-stage: Descarta compiladores y reduce tamaño']
  ],
  headStyles: { fillColor: [14, 165, 233], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
  bodyStyles: { fontSize: 7.5, textColor: [30, 41, 59] },
  alternateRowStyles: { fillColor: [248, 250, 252] },
  theme: 'grid'
});

y = doc.lastAutoTable.finalY + 8;

// SECCIÓN 3: ARQUITECTURA EN LA NUBE DEL E-COMMERCE
drawSectionTitle(3, 'Arquitectura Final de Producción en la Nube (Cloud Topology)');
drawParagraph('Para lograr la máxima velocidad y disponibilidad sin costo, separamos las capas de la aplicación aprovechando lo mejor de cada plataforma:');

autoTable(doc, {
  startY: y,
  margin: { left: 14, right: 14 },
  head: [['Capa', 'Plataforma', 'URL / Acceso', 'Rol en la Arquitectura']],
  body: [
    ['Frontend (UI)', 'Vercel (Edge CDN)', 'https://...vercel.app', 'Distribución global de la SPA, carga instantánea y SSL.'],
    ['Backend (API)', 'Render (Docker Web Service)', 'https://...onrender.com/api', 'Servidor Spring Boot 3 con Java 21 en contenedor Docker.'],
    ['Base de Datos', 'MongoDB Atlas (AWS Cloud)', 'Cluster MongoDB en la nube', 'Persistencia permanente NoSQL con réplicas y alta disponibilidad.']
  ],
  headStyles: { fillColor: [139, 92, 246], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
  bodyStyles: { fontSize: 7.5, textColor: [30, 41, 59] },
  alternateRowStyles: { fillColor: [248, 250, 252] },
  theme: 'grid'
});

y = doc.lastAutoTable.finalY + 8;

// SECCIÓN 4: DESGLOSE DE CÓDIGO
drawSectionTitle(4, 'Código Clave Implementado para la Contenedorización');

drawParagraph('1. Multi-Stage Build del Backend (backend/Dockerfile):');
drawCodeBlock([
  '# ETAPA 1: BUILD CON MAVEN Y JAVA 21',
  'FROM maven:3.9.6-eclipse-temurin-21-alpine AS build',
  'WORKDIR /app',
  'COPY pom.xml .',
  'RUN mvn dependency:go-offline -B',
  'COPY src ./src',
  'RUN mvn clean package -DskipTests',
  '',
  '# ETAPA 2: RUNTIME ULTRA LIVIANO CON JRE 21',
  'FROM eclipse-temurin:21-jre-alpine',
  'WORKDIR /app',
  'RUN addgroup -S appgroup && adduser -S appuser -G appgroup',
  'USER appuser',
  'COPY --from=build /app/target/*.jar app.jar',
  'EXPOSE 8080',
  'ENTRYPOINT ["java", "-jar", "app.jar"]'
], 'backend/Dockerfile');

drawParagraph('2. Servidor Nginx para React SPA (frontend/nginx.conf):');
drawCodeBlock([
  'server {',
  '    listen 80;',
  '    location / {',
  '        root /usr/share/nginx/html;',
  '        index index.html;',
  '        try_files $uri $uri/ /index.html;  # Soporte React Router',
  '    }',
  '}'
], 'frontend/nginx.conf');

drawParagraph('3. Orquestador Local (docker-compose.yml):');
drawCodeBlock([
  'services:',
  '  backend:',
  '    build: ./backend',
  '    ports: ["8080:8080"]',
  '    environment:',
  '      - SPRING_DATA_MONGODB_URI=mongodb+srv://... (Atlas)',
  '  frontend:',
  '    build: ./frontend',
  '    ports: ["5176:80"]',
  '    depends_on: [backend]'
], 'docker-compose.yml');

// SECCIÓN 5: CONCLUSIÓN PEDAGÓGICA
drawSectionTitle(5, 'Conclusión Académica y Profesional');
drawHighlightCard(
  '🎓 Síntesis para tu Examen o Presentación',
  '• JobFlow utiliza un despliegue nativo rápido ideal para APIs monolíticas en Node.js.\n• E-Commerce Gamer implementa una arquitectura moderna basada en Contenedores Docker y Microservicios, permitiendo desacoplar Java 21, React y Nginx de forma estandarizada y lista para escalar en la nube.\n• Ambas soluciones son válidas, pero Docker representa el estándar supremo de la industria en DevOps y arquitecturas Cloud Native.',
  [14, 165, 233]
);

// Aplicar Headers y Footers en todas las páginas generadas
const totalPages = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
  doc.setPage(i);
  addHeaderBanner();
  addFooter();
}

const outputPath = path.join(__dirname, 'Informe_Arquitectura_Docker_vs_JobFlow_UTN.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outputPath, pdfBuffer);
console.log('PDF generado exitosamente en:', outputPath);
