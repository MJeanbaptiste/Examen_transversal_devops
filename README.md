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

## Notas
- La base de datos se inicializa automáticamente con el script `db/init.sql` en el primer arranque.
- Puedes modificar el frontend y backend, reconstruir y volver a levantar los contenedores.


## Observabilidad y Cumplimiento (EP3)

Este proyecto extiende el pipeline de EP2 con observabilidad, metricas y politicas de cumplimiento automatizado.

### Monitoreo y observabilidad (IE1, IE2)
- **AWS CloudWatch + SSM Agent** sobre la instancia EC2: metricas de CPU, memoria y disco, dashboard `tienda-tech-ep3` y alarma de CPU > 70% con notificacion por correo via Amazon SNS.
- **Kubernetes (k3s)**: los 3 microservicios (frontend, backend, base de datos) desplegados en el namespace `tienda`; observabilidad de recursos con `metrics-server` (`kubectl top pods`).

### Metricas de calidad y CI/CD (IE3)
- **SonarCloud**: cobertura de pruebas, bugs, vulnerabilidades y code smells (dashboard del proyecto en sonarcloud.io).
- **GitHub Actions**: tiempo de despliegue visible en cada ejecucion del workflow.

### Politicas de cumplimiento (IE5)
- **SonarCloud** (calidad) y **Snyk** (seguridad, `--severity-threshold=high`) ejecutados en cada push y pull request.
- **Branch protection** en `main`: se exige Pull Request y que los checks de CI, Sonar y Snyk esten en verde antes de fusionar.
- **Dependabot** mantiene las dependencias actualizadas.

### Detencion del pipeline ante fallos criticos (IE6)
- Los workflows de Sonar y Snyk terminan con `exit 1` ante un fallo de calidad o una vulnerabilidad alta, deteniendo el pipeline.
- Combinado con branch protection, un Pull Request con un problema critico queda **bloqueado** y no se puede fusionar hasta corregirlo.
