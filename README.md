# Node Token Microservicios Redis

Este proyecto ahora puede usar almacenamiento persistente con MySQL y levantarse con Docker.

## Ejecutar con Docker

```bash
docker compose up --build
```

La API queda disponible en `http://localhost:3001`, Swagger en `http://localhost:3001/api-docs` y el servicio MySQL en `http://localhost:3003`.

## Variables de entorno

Puedes usar [.env.example](/home/ivanglz12/dev/Node-Token-Microservicios-Redis/.env.example) como referencia.

`REMOTE_DB=true` activa la capa MySQL. Si vale `false`, el proyecto sigue usando `store/dummy.js`.

## Esquema MySQL

El contenedor ejecuta [docker/mysql/init.sql](/home/ivanglz12/dev/Node-Token-Microservicios-Redis/docker/mysql/init.sql) al iniciar y crea estas tablas:

- `user`
- `auth`
- `user_follow`

## Endpoint de seguimiento

La API expone `POST /api/user/follow/:id` para crear la relación de seguimiento entre el usuario autenticado y el usuario objetivo.
