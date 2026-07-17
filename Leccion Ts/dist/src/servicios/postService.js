const API_URL = "https://jsonplaceholder.typicode.com/posts";
export async function obtenerPosts() {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las publicaciones.");
    }
    return await respuesta.json();
}
export async function obtenerPostPorId(id) {
    const respuesta = await fetch(`${API_URL}/${id}`);
    if (!respuesta.ok) {
        throw new Error(`No se encontró la publicación con ID ${id}.`);
    }
    return await respuesta.json();
}
export async function filtrarPostsPorUsuario(userId) {
    const respuesta = await fetch(`${API_URL}?userId=${userId}`);
    if (!respuesta.ok) {
        throw new Error("No se pudieron filtrar las publicaciones por usuario.");
    }
    return await respuesta.json();
}
export async function crearPost(post) {
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });
    if (!respuesta.ok) {
        throw new Error("No se pudo crear la publicación.");
    }
    return await respuesta.json();
}
export async function actualizarTituloPost(id, titulo) {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: titulo })
    });
    if (!respuesta.ok) {
        throw new Error(`No se pudo actualizar el título de la publicación ${id}.`);
    }
    return await respuesta.json();
}
export async function eliminarPost(id) {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    if (!respuesta.ok) {
        throw new Error(`No se pudo eliminar la publicación con ID ${id}.`);
    }
}
