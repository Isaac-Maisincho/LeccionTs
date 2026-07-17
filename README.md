# CRUD de publicaciones con JSONPlaceholder

Esta aplicación consume la API pública de JSONPlaceholder para gestionar publicaciones mediante solicitudes HTTP.

## Estructura del proyecto

- [index.html](index.html): interfaz web.
- [style.css](style.css): estilos de la aplicación.
- [src/models/api.ts](src/models/api.ts): lógica de interacción con la UI.
- [src/servicios/postService.ts](src/servicios/postService.ts): funciones para consumir la API.

## Requisitos

- Tener un navegador moderno.
- Tener TypeScript instalado.

## Ejecución

1. Instala TypeScript si no lo tienes:
   - `npm install -g typescript`
2. Compila el código TypeScript:
   - `tsc -p tsconfig.json`
3. Abre [index.html](index.html) en el navegador.

## Operaciones implementadas

- `GET`: listar publicaciones y consultar una publicación por ID.
- `GET` con filtro: obtener publicaciones por usuario usando `userId`.
- `POST`: crear una nueva publicación.
- `PATCH`: actualizar únicamente el título de una publicación.
- `DELETE`: simular la eliminación de una publicación.

> JSONPlaceholder simula estas operaciones y no guarda cambios de forma permanente.

## Métodos HTTP usados

- `GET`: para obtener datos.
- `POST`: para enviar datos y crear recursos.
- `PATCH`: para modificar parcialmente un recurso.
- `DELETE`: para eliminar un recurso.
