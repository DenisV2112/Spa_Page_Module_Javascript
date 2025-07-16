const END_POINT = "http://localhost:3001/users"


async function auth() { //function to authenticate if user is registered
  const authUser = JSON.parse(sessionStorage.getItem("authUser"));
  const email = document.getElementById('email').value.toLowerCase();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${END_POINT}?email=${email}`);
    const users = await res.json();
    const authUser = JSON.parse(sessionStorage.getItem("authUser"));


   
    if (users.length > 0) {
      const user = users[0];
      if (user.password === password) {
        sessionStorage.setItem("authUser", JSON.stringify(user));
        window.location = "/src/assets/components/pages/dashboard.html";
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("Este correo no está registrado");
    }
  } catch (error) {
    alert("Error al autenticar");
    console.error(error);
  }

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}


function logout() { //Went the user logout window go to login page
  sessionStorage.removeItem("authUser");
  window.location = "/src/assets/components/pages/login.html";
}
