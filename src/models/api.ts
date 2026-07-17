import {
  actualizarTituloPost,
  crearPost,
  eliminarPost,
  filtrarPostsPorUsuario,
  obtenerPostPorId,
  obtenerPosts,
  type Post
} from "../servicios/postService.js";

const txtId = document.getElementById("id") as HTMLInputElement | null;
const txtUserId = document.getElementById("userId") as HTMLInputElement | null;
const txtTitulo = document.getElementById("title") as HTMLInputElement | null;
const txtCuerpo = document.getElementById("body") as HTMLTextAreaElement | null;

const btnListar = document.getElementById("listar") as HTMLButtonElement | null;
const btnBuscar = document.getElementById("buscar") as HTMLButtonElement | null;
const btnFiltrar = document.getElementById("filtrar") as HTMLButtonElement | null;
const btnCrear = document.getElementById("crear") as HTMLButtonElement | null;
const btnActualizar = document.getElementById("actualizar") as HTMLButtonElement | null;
const btnEliminar = document.getElementById("eliminar") as HTMLButtonElement | null;

const tabla = document.getElementById("tablaPosts") as HTMLTableSectionElement | null;
const mensaje = document.getElementById("mensaje") as HTMLDivElement | null;

function mostrarMensaje(texto: string, tipo: "error" | "exito" = "exito"): void {
  if (!mensaje) {
    return;
  }

  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
}

function limpiarFormulario(): void {
  if (txtId) txtId.value = "";
  if (txtUserId) txtUserId.value = "";
  if (txtTitulo) txtTitulo.value = "";
  if (txtCuerpo) txtCuerpo.value = "";
}

function mostrarPosts(posts: Post[]): void {
  if (!tabla) {
    return;
  }

  tabla.innerHTML = "";

  if (posts.length === 0) {
    tabla.innerHTML = `<tr><td colspan="4">No hay publicaciones disponibles.</td></tr>`;
    return;
  }

  posts.forEach((post) => {
    tabla.innerHTML += `
      <tr>
        <td>${post.id ?? "N/A"}</td>
        <td>${post.userId}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
      </tr>
    `;
  });
}

async function cargarPosts(): Promise<void> {
  try {
    const posts = await obtenerPosts();
    mostrarPosts(posts);
    mostrarMensaje("Publicaciones cargadas correctamente.");
  } catch (error) {
    mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
  }
}

btnListar?.addEventListener("click", async () => {
  await cargarPosts();
});

btnBuscar?.addEventListener("click", async () => {
  const id = Number(txtId?.value);

  if (!id) {
    mostrarMensaje("Ingrese un ID válido para buscar.", "error");
    return;
  }

  try {
    const post = await obtenerPostPorId(id);
    mostrarPosts([post]);
    mostrarMensaje(`Publicación ${id} encontrada.`);

    if (txtUserId) txtUserId.value = post.userId.toString();
    if (txtTitulo) txtTitulo.value = post.title;
    if (txtCuerpo) txtCuerpo.value = post.body;
  } catch (error) {
    mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
  }
});

btnFiltrar?.addEventListener("click", async () => {
  const userId = Number(txtUserId?.value);

  if (!userId) {
    mostrarMensaje("Ingrese un ID de usuario válido para filtrar.", "error");
    return;
  }

  try {
    const posts = await filtrarPostsPorUsuario(userId);
    mostrarPosts(posts);
    mostrarMensaje(`Se mostraron ${posts.length} publicaciones del usuario ${userId}.`);
  } catch (error) {
    mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
  }
});

btnCrear?.addEventListener("click", async () => {
  const userId = Number(txtUserId?.value);
  const title = txtTitulo?.value.trim() ?? "";
  const body = txtCuerpo?.value.trim() ?? "";

  if (!userId || !title || !body) {
    mostrarMensaje("Complete todos los campos para crear una publicación.", "error");
    return;
  }

  try {
    const nuevoPost: Omit<Post, "id"> = { userId, title, body };
    await crearPost(nuevoPost);
    mostrarMensaje("Publicación creada correctamente.");
    limpiarFormulario();
    await cargarPosts();
  } catch (error) {
    mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
  }
});

btnActualizar?.addEventListener("click", async () => {
  const id = Number(txtId?.value);
  const titulo = txtTitulo?.value.trim() ?? "";

  if (!id || !titulo) {
    mostrarMensaje("Ingrese un ID y un nuevo título para actualizar.", "error");
    return;
  }

  try {
    await actualizarTituloPost(id, titulo);
    mostrarMensaje(`Título actualizado en la publicación ${id}.`);
    limpiarFormulario();
    await cargarPosts();
  } catch (error) {
    mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
  }
});

btnEliminar?.addEventListener("click", async () => {
  const id = Number(txtId?.value);

  if (!id) {
    mostrarMensaje("Ingrese un ID válido para eliminar.", "error");
    return;
  }

  try {
    await eliminarPost(id);
    mostrarMensaje(`Publicación ${id} eliminada correctamente.`);
    limpiarFormulario();
    await cargarPosts();
  } catch (error) {
    mostrarMensaje(error instanceof Error ? error.message : "Error desconocido.", "error");
  }
});

window.addEventListener("load", () => {
  void cargarPosts();
});