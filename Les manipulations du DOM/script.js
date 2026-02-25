/* Toutes les variables */
let li = document.querySelector("#listeCourses li");

/* Tous les évènements */
li.addEventListener('click', function() {
  // On bascule la classe CSS (TP14)
  this.classList.toggle("itemCheck");
});

/* Les fonctions */
// A voir plus tard