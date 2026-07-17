import { actualizarTituloPost, crearPost, eliminarPost, filtrarPostsPorUsuario, obtenerPostPorId, obtenerPosts } from "../servicios/postService.js";
const txtId = document.getElementById("id");
const txtUserId = document.getElementById("userId");
const txtTitulo = document.getElementById("title");
const txtCuerpo = document.getElementById("body");
const btnListar = document.getElementById("listar");
const btnBuscar = document.getElementById("buscar");
const btnFiltrar = document.getElementById("filtrar");
const btnCrear = document.getElementById("crear");
const btnActualizar = document.getElementById("actualizar");
const btnEliminar = document.getElementById("eliminar");
const tabla = document.getElementById("tablaPosts");
const mensaje = document.getElementById("mensaje");
function mostrarMensaje(texto, tipo = "exito") {
    if (!mensaje) {
        return;
    }
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
}
function limpiarFormulario() {
    if (txtId)
        txtId.value = "";
    if (txtUserId)
        txtUserId.value = "";
    if (txtTitulo)
        txtTitulo.value = "";
    if (txtCuerpo)
        txtCuerpo.value = "";
}
function mostrarPosts(posts) {
    if (!tabla) {
        return;
    }
    tabla.innerHTML = "";
    if (posts.length === 0) {
        tabla.innerHTML = `<tr><td colspan="4">No hay publicaciones disponibles.</td></tr>`;
        return;
    }
    posts.forEach((post) => {
        var _a;
        tabla.innerHTML += `
      <tr>
        <td>${(_a = post.id) !== null && _a !== void 0 ? _a : "N/A"}</td>
        <td>${post.userId}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
      </tr>
    `;
    });
}
async function cargarPosts() {
    try {
        const posts = await obtenerPosts();
        mostrarPosts(posts);
        mostrarMensaje("Publicaciones cargadas correctamente.");
    }
    catch (error) {
        mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
    }
}
btnListar === null || btnListar === void 0 ? void 0 : btnListar.addEventListener("click", async () => {
    await cargarPosts();
});
btnBuscar === null || btnBuscar === void 0 ? void 0 : btnBuscar.addEventListener("click", async () => {
    const id = Number(txtId === null || txtId === void 0 ? void 0 : txtId.value);
    if (!id) {
        mostrarMensaje("Ingrese un ID válido para buscar.", "error");
        return;
    }
    try {
        const post = await obtenerPostPorId(id);
        mostrarPosts([post]);
        mostrarMensaje(`Publicación ${id} encontrada.`);
        if (txtUserId)
            txtUserId.value = post.userId.toString();
        if (txtTitulo)
            txtTitulo.value = post.title;
        if (txtCuerpo)
            txtCuerpo.value = post.body;
    }
    catch (error) {
        mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
    }
});
btnFiltrar === null || btnFiltrar === void 0 ? void 0 : btnFiltrar.addEventListener("click", async () => {
    const userId = Number(txtUserId === null || txtUserId === void 0 ? void 0 : txtUserId.value);
    if (!userId) {
        mostrarMensaje("Ingrese un ID de usuario válido para filtrar.", "error");
        return;
    }
    try {
        const posts = await filtrarPostsPorUsuario(userId);
        mostrarPosts(posts);
        mostrarMensaje(`Se mostraron ${posts.length} publicaciones del usuario ${userId}.`);
    }
    catch (error) {
        mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
    }
});
btnCrear === null || btnCrear === void 0 ? void 0 : btnCrear.addEventListener("click", async () => {
    var _a, _b;
    const userId = Number(txtUserId === null || txtUserId === void 0 ? void 0 : txtUserId.value);
    const title = (_a = txtTitulo === null || txtTitulo === void 0 ? void 0 : txtTitulo.value.trim()) !== null && _a !== void 0 ? _a : "";
    const body = (_b = txtCuerpo === null || txtCuerpo === void 0 ? void 0 : txtCuerpo.value.trim()) !== null && _b !== void 0 ? _b : "";
    if (!userId || !title || !body) {
        mostrarMensaje("Complete todos los campos para crear una publicación.", "error");
        return;
    }
    try {
        const nuevoPost = { userId, title, body };
        await crearPost(nuevoPost);
        mostrarMensaje("Publicación creada correctamente.");
        limpiarFormulario();
        await cargarPosts();
    }
    catch (error) {
        mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
    }
});
btnActualizar === null || btnActualizar === void 0 ? void 0 : btnActualizar.addEventListener("click", async () => {
    var _a;
    const id = Number(txtId === null || txtId === void 0 ? void 0 : txtId.value);
    const titulo = (_a = txtTitulo === null || txtTitulo === void 0 ? void 0 : txtTitulo.value.trim()) !== null && _a !== void 0 ? _a : "";
    if (!id || !titulo) {
        mostrarMensaje("Ingrese un ID y un nuevo título para actualizar.", "error");
        return;
    }
    try {
        await actualizarTituloPost(id, titulo);
        mostrarMensaje(`Título actualizado en la publicación ${id}.`);
        limpiarFormulario();
        await cargarPosts();
    }
    catch (error) {
        mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
    }
});
btnEliminar === null || btnEliminar === void 0 ? void 0 : btnEliminar.addEventListener("click", async () => {
    const id = Number(txtId === null || txtId === void 0 ? void 0 : txtId.value);
    if (!id) {
        mostrarMensaje("Ingrese un ID válido para eliminar.", "error");
        return;
    }
    try {
        await eliminarPost(id);
        mostrarMensaje(`Publicación ${id} eliminada correctamente.`);
        limpiarFormulario();
        await cargarPosts();
    }
    catch (error) {
        mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
    }
});
window.addEventListener("load", () => {
    void cargarPosts();
});
