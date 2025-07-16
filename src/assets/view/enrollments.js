import { END_POINT } from "../scripts/config.js";

const user = JSON.parse(sessionStorage.getItem("authUser"));
async function Enrollments() {
    try {
      const res = await fetch(`${END_POINT}/events`);
      const allEvents = await res.json();

      const show = allEvents.filter(events =>
        events.registered.includes(user.email)
      );

      const container = document.getElementById("main");

      if (show.length === 0) {
        container.innerHTML = `<p class="text-gray-500">No tienes Eventos registrados.</p>`;
        return;
      }
      container.innerHTML =``;
      container.innerHTML = show.map(events => `
        <div class="border rounded-lg p-4 hover:shadow-md transition p-8 rounded-xl border border-gray-200">
          <h3 class="font-semibold mt-2">${events.tittle}</h3>
          <p class="text-sm text-gray-600">${events.description}</p>
          <p class="text-sm text-gray-600">Fecha: ${events.date}</p>
        </div>
      `).join('');
    } catch (err) {
      console.error("Error cargando notas:", err);
    }
  }

  export default Enrollments;
