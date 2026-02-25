let dateJour = new Date(Date.now());
let dateJourFr = dateJour.toLocaleDateString('fr-FR');
let titre = document.querySelector("h2");
titre.textContent = titre.textContent + " : " + dateJourFr;

let myInput = document.querySelector("#myInput");
let btn = document.querySelector(".addBtn");
let liste = document.querySelector("#listeCourses");
let premierLi = document.querySelector("#listeCourses li");

premierLi.addEventListener('click', function() {
    this.classList.toggle("itemCheck");
});

function addProduct() {
    let valeur = myInput.value;

    if (valeur === "") {
        alert("Erreur de saisie");
    } else {
        alert("Produit ajouté");
        
        let nouveauLi = document.createElement("li");
        nouveauLi.textContent = valeur;
        
        nouveauLi.addEventListener('click', function() {
            this.classList.toggle("itemCheck");
        });
        
        liste.appendChild(nouveauLi);
        myInput.value = "";
    }
}

btn.addEventListener('click', addProduct);

myInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addProduct();
    }
});