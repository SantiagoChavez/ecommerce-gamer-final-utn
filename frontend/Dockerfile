# ==========================================
# Etapa 1: Build de la app React con Node.js
# ==========================================
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ==========================================
# Etapa 2: Servidor Nginx para producción
# ==========================================
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Limpiamos los archivos por defecto de nginx
RUN rm -rf ./*

# Copiamos la build estática de React
COPY --from=build /app/dist .

# Copiamos la configuración de Nginx con soporte SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
