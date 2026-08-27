@echo off
title Arranque del Proyecto Fullstack

:: Ajusta estas dos rutas si usas MongoDB Local
set MONGO_PATH="C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe"
set DB_PATH="C:\data\db"

echo -------------------------------
echo Verificando base de datos...
echo -------------------------------

:: Crear carpeta de datos si no existe y si se va a usar local
if not exist %DB_PATH% (
    mkdir %DB_PATH% 2>nul
)

:: Solo iniciar MongoDB local si el ejecutable existe
if exist %MONGO_PATH% (
    echo Iniciando ejecutable de MongoDB local...
    start "MongoDB Server" %MONGO_PATH% --dbpath %DB_PATH%
    rem Retardo no interactivo compatible (2 segundos aprox)
    ping -n 3 127.0.0.1 > nul
) else (
    echo [INFO] No se encontro mongod.exe en la ruta especificada. 
    echo Si estas usando MongoDB Atlas en la nube, esto es correcto.
)

echo -------------------------------
echo Iniciando Backend (Spring Boot)...
echo -------------------------------
:: Resolver conflicto con ejecutable vacío mvn en system32
set MAVEN_EXEC=mvn
if exist "C:\apache-maven-3.9.11\bin\mvn.cmd" (
    set MAVEN_EXEC="C:\apache-maven-3.9.11\bin\mvn.cmd"
)

:: Iniciamos backend usando /D para evitar problemas con espacios en rutas
start /B "Backend" /D "%~dp0backend" cmd /c "%MAVEN_EXEC% spring-boot:run > nul 2>&1"

:: Retardo no interactivo compatible (5 segundos aprox)
ping -n 6 127.0.0.1 > nul

echo -------------------------------
echo Iniciando Frontend (React/Vite)...
echo -------------------------------
:: Iniciamos frontend usando /D para evitar problemas con espacios en rutas
start /B "Frontend" /D "%~dp0frontend" cmd /c "npm run dev > nul 2>&1"

:: Retardo no interactivo compatible (3 segundos aprox)
ping -n 4 127.0.0.1 > nul

echo -------------------------------
echo Abriendo navegador en el frontend...
echo -------------------------------
start http://localhost:5176

echo Listo! Backend y Frontend arrancados.
