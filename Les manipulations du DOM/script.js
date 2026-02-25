/* Toutes les variables */
let li = document.querySelector("#listeCourses li");

/* Tous les évènements */
li.addEventListener('click', function() {
  // Changement de la couleur de fond et texte barré
  this.style.backgroundColor = "lightblue";
  this.style.textDecoration = "line-through";
});

/* Les fonctions */
// A voir plus tard