
async function register() {
  const email = document.getElementById('email').value.toLowerCase();
  const username = document.getElementById('userName').value.toLowerCase();
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;

  // Validación básica
  if (!email || !username || !password || !name) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  try {
    // Verifica si ya existe el email o username
    const res = await fetch("http://localhost:3001/users");
    const users = await res.json();

    const emailExists = users.some(u => u.email?.toLowerCase() === email);
    const usernameExists = users.some(u => u.userName?.toLowerCase() === username);

    if (emailExists) {
      alert("Este correo ya está registrado. Usa otro o inicia sesión.");
      return;
    }

    if (usernameExists) {
      alert("Este Username ya está registrado. Usa otro o inicia sesión.");
      return;
    }

    // Crear nuevo usuario
    const newUser = {
      name,
      userName: username,
      password,
      email,
      role: "user"
    };

    const createRes = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });

    if (!createRes.ok) {
      throw new Error("Error al registrar el usuario.");
    }

    const createdUser = await createRes.json();

    sessionStorage.setItem("authUser", JSON.stringify(createdUser));
    alert("Usuario registrado con éxito.");
    window.location.href = "./login.html";

    // Limpiar campos
    document.getElementById("name").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

  } catch (error) {
    console.error("Error en el registro:", error);
    alert("Hubo un problema al registrar el usuario.");
  }
}
