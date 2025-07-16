import { END_POINT } from "../scripts/config.js";
import createEvent from "../scripts/createEvents.js";
import editEvent from "../scripts/editEvent.js";




const user = JSON.parse(sessionStorage.getItem("authUser"));

async function event() {
  try {
    const res = await fetch(`${END_POINT}/events`);
    const allEvents = await res.json();

    const container = document.getElementById("main");
    const addButton = document.getElementById("addButton");

    if (allEvents.length === 0) {
      container.innerHTML = `<p class="text-gray-500">No tienes Eventos registrados.</p>`;
      return;
    }

    // Mostrar botón para crear evento si es admin
    addButton.innerHTML = user.role === "admin"
      ? `<button id="newEvent" class="btn btn-success">Add</button>`
      : "";

    // Renderizar eventos
    container.innerHTML = allEvents.map(event => `
      <div class="border rounded-lg p-4 hover:shadow-md transition p-8 rounded-xl border border-gray-200">
        <h3 class="font-semibold mt-2">${event.tittle}</h3>
        <p class="text-sm text-gray-600">${event.description}</p>
        <p class="text-sm text-gray-600">Fecha: ${event.date}</p>
        <p class="text-sm text-gray-600">Capacidad: ${event.capacity}</p>
        <p class="text-sm text-gray-600">Registrados: ${event.registered?.length || 0}</p>
        ${
          user.role === "admin"
            ? `<div class="flex gap-2 mt-4">
    <button id="editButton-${event.id}" data-id="${event.id}" class="btn btn-warning">Edit</button>
    <button id="deleteButton-${event.id}" data-id="${event.id}" class="btn btn-danger">Delete</button>
  </div>
`
            : `<button id="enrollButton-${event.id}" data-id="${event.id}" class="btn btn-primary mt-2">Enroll</button>`
        }
      </div>
    `).join("");

    // Listener para crear eventos
    if (document.getElementById("newEvent")) {
      document.getElementById("newEvent").addEventListener("click", createEvent);
    }

    // Lógica para inscribir usuarios (rol "user")
    if (user.role === "user") {
      document.querySelectorAll("[id^='enrollButton-']").forEach(button => {
        button.addEventListener("click", async (e) => {
          e.preventDefault();
          const id = button.dataset.id;

          try {
            const res = await fetch(`${END_POINT}/events/${id}`);
            const event = await res.json();

            event.registered = event.registered || [];

            const alreadyRegistered = event.registered.includes(user.email);
            if (alreadyRegistered) {
              alert("Ya estás inscrito en este evento.");
              return;
            }

            if (event.registered.length >= event.capacity) {
              alert("Este evento ya alcanzó su capacidad máxima.");
              return;
            }

            event.registered.push(user.email);

            const updateRes = await fetch(`${END_POINT}/events/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(event),
            });

            if (!updateRes.ok) {
              throw new Error("No se pudo registrar en el evento.");
            }

            alert("Te has inscrito al evento exitosamente.");

          } catch (error) {
            console.error("Error al inscribirse:", error);
            alert("Error al inscribirse al evento.");
          }
        });
      });
    }
     if (user.role === "admin") {
    // Editar eventos
   
  document.querySelectorAll("[id^='editButton-']").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = button.dataset.id;
      editEvent(id);
    });
  });
}
   if (user.role === "admin") {
  // Eliminar eventos
  document.querySelectorAll("[id^='deleteButton-']").forEach(button => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = button.dataset.id;

      const confirmDelete = confirm("¿Estás seguro de eliminar este evento?");
      if (!confirmDelete) return;

      try {
        const res = await fetch(`${END_POINT}/events/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Error al eliminar el evento.");

        alert("Evento eliminado correctamente.");
        event(); // recarga la lista de eventos
      } catch (err) {
        console.error("Error al eliminar:", err);
        alert("No se pudo eliminar el evento.");
      }
    });
  });
}

  } catch (err) {
    console.error("Error cargando eventos:", err);
  }
}

export default event;
