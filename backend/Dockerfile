# ==========================================
# Etapa 1: Compilación de la app con Maven
# ==========================================
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copiamos primero el pom.xml para aprovechar el cache de dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiamos el código fuente y empaquetamos el JAR
COPY src ./src
RUN mvn clean package -DskipTests

# ==========================================
# Etapa 2: Imagen de ejecución (JRE 21)
# ==========================================
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Creamos un usuario no-root por seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copiamos el JAR generado desde la etapa anterior
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
