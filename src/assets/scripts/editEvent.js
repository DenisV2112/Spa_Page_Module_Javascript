import { END_POINT } from "./config.js";
export default async function editEvent(id) {
  const content = document.getElementById("main");

  try {
    const res = await fetch(`${END_POINT}/events/${id}`);
    const event = await res.json();

    content.innerHTML = `
      <form id="editForm">
        <div class="mb-3">
          <label for="titulo" class="form-label">Título</label>
          <input type="text" id="titulo" name="titulo" class="form-control" value="${event.tittle}" required>
        </div>
        <div class="mb-3">
          <label for="descripcion" class="form-label">Descripción</label>
          <textarea id="descripcion" name="descripcion" class="form-control" required>${event.description}</textarea>
        </div>
        <div class="mb-3">
          <label for="fecha" class="form-label">Fecha</label>
          <input type="date" id="fecha" name="fecha" class="form-control" value="${event.date}" required>
        </div> 
        <div class="mb-3">
          <label for="capacity" class="form-label">Capacidad</label>
          <input type="number" id="capacity" name="capacity" class="form-control" value="${event.capacity}" required>
        </div>   
        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
      </form>
    `;

    const form = document.getElementById("editForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const updatedEvent = {
        ...event,
        tittle: form.titulo.value,
        description: form.descripcion.value,
        date: form.fecha.value,
        capacity: form.capacity.value
      };

      const updateRes = await fetch(`http://localhost:3001/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent)
      });

      if (!updateRes.ok) {
        throw new Error("No se pudo actualizar el evento.");
      }

      alert("Evento actualizado con éxito.");
       routes["Events"]();
    });

  } catch (error) {
    console.error("Error cargando evento para editar:", error);
    content.innerHTML = `<p>Error al cargar el evento.</p>`;
  }
}
