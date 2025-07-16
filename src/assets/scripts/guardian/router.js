import Enrollments from "../../view/enrollments.js";
import Events from "../../view/events.js"
     const routes ={
        "Events": Events,
        "Enrollments": Enrollments
    }
    

document.querySelectorAll("nav a").forEach(button => { //use data link to get views and change the page
    
    const url = button.dataset.view;
    button.addEventListener("click", function(event) {
        event.preventDefault()
         routes[url]()
        
})
});
routes["Events"]();