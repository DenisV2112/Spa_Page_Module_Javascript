export default function NotFound() {
  const main = document.getElementById("main");

  main.innerHTML = `
    <div class="text-center mt-10">
      <h1 class="text-3xl font-bold text-red-600">404 - Página no encontrada</h1>
      <p class="text-gray-600 mt-2">La vista solicitada no existe o ha fallado al cargar.</p>
      <a href="#/Events" class="text-blue-500 hover:underline mt-4 inline-block">Volver a eventos</a>
    </div>
  `;
}
