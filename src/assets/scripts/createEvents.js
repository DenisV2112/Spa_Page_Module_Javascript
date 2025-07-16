
export default async function createEvents() { //create events functions

const content = document.getElementById("main");
  content.innerHTML = `

  <form id="formEvento">
  <div class="mb-3">
    <label for="titulo" class="form-label">Título</label>
    <input type="text" id="titulo" name="titulo" class="form-control" required>
  </div>
  <div class="mb-3">
    <label for="descripcion" class="form-label">Descripción</label>
    <textarea id="descripcion" name="descripcion" class="form-control" required></textarea>
  </div>
  <div class="mb-3">
    <label for="fecha" class="form-label">Fecha</label>
    <input type="date" id="fecha" name="fecha" class="form-control" required>
  </div> 
   <div class="mb-3">
    <label for="capacity" class="form-label">capacity</label>
    <input type="text" id="capacity" name="capacity" class="form-control" required>
  </div>   


  <button type="button" id ="formSubmit" class="btn btn-success">Guardar Evento</button>
</form>`


  const url = 'http://localhost:3001/events';
  const form = document.getElementById('formEvento');
  const createDb = document.getElementById('formSubmit');

  if (createDb) {
    console.log(document.getElementById('formSubmit'))
    createDb.addEventListener('click', async e => { //send the information to Data Base
      e.preventDefault();

      const newEvent = {
        tittle: form.titulo.value,
        description: form.descripcion.value,
        date: form.fecha.value,
        registered: [],
        capacity: form.capacity.value
      };

          await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
          });
          alert("Evento creado con éxito.");
          routes["Events"]
    });
  }
}