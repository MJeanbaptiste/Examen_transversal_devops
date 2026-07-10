# Tienda productos Tecnologicos

Aplicación de ejemplo en 3 capas usando Docker y Docker Compose:

- Frontend: HTML + JavaScript (Nginx)
- Backend: Node.js + Express
- Base de datos: MySQL

## Requisitos

- Docker Desktop instalado

## Estructura del proyecto

tienda-tech-LOCAL
├── docker-compose.yml
├── tienda-tech-frontend
│   ├── Dockerfile
│   ├── index.html
│   └── app.js
│   └── nginx.conf
├── tienda-tech-backend
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
└── tienda-tech-db
    └── init.sql
    └── Dockerfile

## Cómo ejecutar

1. Abrir una terminal en la carpeta del proyecto tienda-tech-LOCAL
2. Ejecutar:
```bash
docker compose build
docker compose up -d
docker ps
docker compose logs db
docker compose logs backend
docker compose logs frontend
```
3. Abrir en el navegador:
- Frontend: http://localhost:8080
- Backend (API): http://localhost:3001/api/productos

4. Para detener los contenedores:
```bash
docker compose down -v
```

5. Eliminar contenedores:
```bash
docker rm tienda-tech-backend
docker rm tienda-tech-frontend
docker rm tienda-tech-db
```

=========================================================
README.txt
Proyecto Final - Ingeniería DevOps
=========================================================

Nombre del Proyecto:
Proyecto Final DevOps

Descripción
Este proyecto corresponde a la evaluación final de la asignatura Ingeniería DevOps. Su objetivo es automatizar el ciclo de vida de una aplicación utilizando herramientas y buenas prácticas DevOps, incluyendo Git, GitHub, Docker, GitHub Actions, SonarQube, Snyk y Docker Hub.

---------------------------------------------------------
1. Configuración del Entorno, Manejo del Repositorio y
   Estrategia de Branching
---------------------------------------------------------

Se implementó una estrategia de control de versiones basada en Git utilizando las siguientes ramas:

- main
  Contiene la versión estable del proyecto.

- develop
  Rama utilizada para integrar todas las nuevas funcionalidades antes de llegar a producción.

- feature/*
  Ramas temporales destinadas al desarrollo de nuevas funcionalidades.

- hotfix/*
  Ramas utilizadas para corregir errores críticos detectados en producción.

Cada cambio realizado fue registrado mediante commits descriptivos y posteriormente integrado utilizando Pull Requests, permitiendo mantener la trazabilidad del desarrollo.

El repositorio se encuentra alojado en GitHub y mantiene un historial completo de cambios.

---------------------------------------------------------
2. Automatización con GitHub Actions y Docker
---------------------------------------------------------

La aplicación fue contenerizada utilizando Docker mediante un Dockerfile.

Se implementó un pipeline CI/CD con GitHub Actions que realiza automáticamente las siguientes tareas:

• Descarga el código fuente.
• Construye la imagen Docker.
• Ejecuta pruebas unitarias.
• Si las pruebas son exitosas, publica automáticamente la imagen en Docker Hub.
• El pipeline se ejecuta automáticamente cuando existe un push a la rama develop o un Pull Request hacia main.

Esta automatización garantiza que cada cambio sea validado antes de llegar a producción.

---------------------------------------------------------
Herramientas Utilizadas
---------------------------------------------------------

- Visual Studio Code
- Git
- GitHub
- Docker
- Docker Hub
- GitHub Actions
- Python
- Pytest

=========================================================
Fin del documento
=========================================================
