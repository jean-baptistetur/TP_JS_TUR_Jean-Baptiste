
let li = document.querySelector("#listeCourses li");


let dateJour = new Date(Date.now());
let dateJourFr = dateJour.toLocaleDateString('fr-FR');


let titre = document.querySelector("h2");


titre.textContent = titre.textContent + " : " + dateJourFr;



li.addEventListener('click', function() {
  this.classList.toggle("itemCheck");
});