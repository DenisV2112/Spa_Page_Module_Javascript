



 const user = JSON.parse(sessionStorage.getItem("authUser"));
  if (!user) {
    window.location.href = "/src/assets/components/pages/login.html";
  }
const  userName= document.getElementById("userName");
  userName.innerHTML=`
  ${user.name}
  `
if (user?.role === "admin") {

  const enrollmentsLink = document.getElementById("nav-enrollments");
  if (enrollmentsLink) {
    enrollmentsLink.style.display = "none";
  }
}

