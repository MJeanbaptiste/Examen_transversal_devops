# Evidencias de Flujo CI/CD Local

## Flujo Demostrado

```
Push a GitHub (main) --> GitHub Actions --> Build & Publish a GHCR --> Watchtower detecta --> Contenedor local se actualiza
```

## Paso 1: Cambio en el codigo

Se modifico el titulo del frontend de `Tienda de Productos Tecnologicos 2` a `Tienda de Productos Tecnologicos V4` y se hizo push a `main`.

**Commit:** `Update frontend title to V4 - evidence of CI/CD pipeline`

## Paso 2: GitHub Actions ejecuta el pipeline

El pipeline CI/CD se activo automaticamente al hacer push. Consta de 3 jobs:

| Job | Descripcion | Resultado |
|-----|-------------|-----------|
| Run Tests | Ejecuta los unit tests del backend | Passed (21s) |
| Build & Publish Docker Images | Construye y publica las imagenes en GHCR | Passed (54s) |
| Verify Deployment | Levanta contenedores y verifica salud | Passed (1m 6s) |

Ver archivo: `04-github-actions-pipeline.txt`

## Paso 3: Imagenes publicadas en GitHub Container Registry (GHCR)

Las imagenes se publican en:
- `ghcr.io/alejandroamesticaduoc/tienda-tech-frontend:latest`
- `ghcr.io/alejandroamesticaduoc/tienda-tech-backend:latest`
- `ghcr.io/alejandroamesticaduoc/tienda-tech-db:latest`

Ver archivo: `03-docker-images.txt`

## Paso 4: Watchtower detecta y actualiza contenedores locales

Watchtower revisa cada 30 segundos si hay imagenes nuevas en GHCR. Al detectar cambios:
1. Descarga la nueva imagen
2. Detiene el contenedor actual
3. Levanta un nuevo contenedor con la imagen actualizada

Logs clave de Watchtower:
```
Found new ghcr.io/alejandroamesticaduoc/tienda-tech-frontend:latest image
Stopping /tienda-tech-frontend with SIGTERM
Creating /tienda-tech-frontend
Session done - Failed=0 Scanned=3 Updated=2
```

Ver archivo: `02-watchtower-logs.txt`

## Paso 5: Verificacion del cambio en local

Los contenedores locales reflejan el cambio automaticamente:
- El titulo cambio de "Tecnologicos 2" a "Tecnologicos V4"
- El subtitulo cambio a "CI/CD con GHCR y Watchtower"
- Todos los contenedores estan saludables (healthy)

Ver archivo: `01-docker-containers-status.txt`

## Estado de los contenedores

| Servicio | Imagen | Puerto | Estado |
|----------|--------|--------|--------|
| Frontend (Nginx) | ghcr.io/.../tienda-tech-frontend:latest | 8080:80 | Healthy |
| Backend (Node.js) | ghcr.io/.../tienda-tech-backend:latest | 3001:3001 | Healthy |
| Database (MySQL) | ghcr.io/.../tienda-tech-db:latest | 3306:3306 | Healthy |
| Watchtower | containrrr/watchtower:latest | - | Running |

## API Health Check

```json
{"status":"ok","db":true}
```

Ver archivo: `05-backend-health-response.json`

## Archivos de evidencia incluidos

| Archivo | Contenido |
|---------|-----------|
| `01-docker-containers-status.txt` | Estado de todos los contenedores Docker |
| `02-watchtower-logs.txt` | Logs de Watchtower mostrando deteccion y actualizacion |
| `03-docker-images.txt` | Lista de imagenes Docker con sus tags de GHCR |
| `04-github-actions-pipeline.txt` | Resultado del pipeline CI/CD en GitHub Actions |
| `05-backend-health-response.json` | Respuesta del endpoint de salud del backend |
| `06-api-productos-response.json` | Respuesta de la API con los productos |
