# Node Token Microservicios Redis

Este proyecto ahora puede usar almacenamiento persistente con MySQL y levantarse con Docker.

## Ejecutar con Docker

```bash
docker compose up --build
```

La API queda disponible en `http://localhost:3001`, Swagger en `http://localhost:3001/api-docs`, el servicio MySQL en `http://localhost:3003` y el `cache-service` en `http://localhost:3004`.

## Variables de entorno

Puedes usar [.env.example](/home/ivanglz12/dev/Node-Token-Microservicios-Redis/.env.example) como referencia.

`REMOTE_DB=true` activa la capa MySQL. Si vale `false`, el proyecto sigue usando `store/dummy.js`.

## Despliegue en Vercel

El proyecto quedó preparado para desplegarse en Vercel como una sola aplicación Express serverless usando el entrypoint raíz [index.js](/home/ivanglz/ivan/Node-Token-Microservicios-Redis/index.js).

### Pasos

```bash
npm install
vercel
```

### Variables de entorno recomendadas en Vercel

- `REMOTE_DB=true`
- `JWT_SECRET=tu_secreto`
- `JWT_EXPIRES_IN=2h`
- `MYSQL_HOST=...`
- `MYSQL_PORT=3306`
- `MYSQL_USER=...`
- `MYSQL_PASSWORD=...`
- `MYSQL_DATABASE=...`

### Notas

- En Vercel ya no hace falta exponer el microservicio HTTP de MySQL; la API principal consulta MySQL directamente.
- La app principal publica `POST /api/auth/login`, `GET|POST|PUT /api/user/*` y Swagger en `/api-docs`.
- Para probar localmente el comportamiento de Vercel, usa `vercel dev`.

## Esquema MySQL

El contenedor ejecuta [docker/mysql/init.sql](/home/ivanglz12/dev/Node-Token-Microservicios-Redis/docker/mysql/init.sql) al iniciar y crea estas tablas:

- `user`
- `auth`
- `user_follow`

## Endpoint de seguimiento

La API expone `POST /api/user/follow/:id` para crear la relación de seguimiento entre el usuario autenticado y el usuario objetivo.
