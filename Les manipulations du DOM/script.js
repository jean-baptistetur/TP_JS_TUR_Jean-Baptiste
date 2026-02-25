// Date du jour en français dans le titre
let dateJour = new Date(Date.now());
let dateJourFr = dateJour.toLocaleDateString('fr-FR');
let titre = document.querySelector("h2");
titre.textContent = titre.textContent + " : " + dateJourFr;

// Récupération des éléments du DOM
let myInput = document.querySelector("#myInput");
let btn = document.querySelector(".addBtn");
let listeElement = document.querySelector("#listeCourses");

// Récupération de la liste depuis le localStorage (tableau vide si rien)
let courses = JSON.parse(localStorage.getItem("liste_courses")) || [];

// Sauvegarde dans le localStorage puis rafraîchissement
function saveAndRender() {
    localStorage.setItem("liste_courses", JSON.stringify(courses));
    render();
}

// Génération des éléments de la liste
function render() {
    listeElement.innerHTML = "";
    courses.forEach((item, index) => {
        let li = document.createElement("li");

        // Affichage de la quantité si supérieure à 1
        let texteAffichage = item.nom;
        if (item.quantite > 1) {
            texteAffichage += ` (x${item.quantite})`;
        }
        li.textContent = texteAffichage;

        // Style barré si l'article est coché
        if (item.checked) {
            li.classList.add("itemCheck");
        }

        // Clic simple : cocher/décocher
        li.addEventListener('click', () => {
            courses[index].checked = !courses[index].checked;
            saveAndRender();
        });

        // Double clic : suppression de l'article
        li.addEventListener('dblclick', () => {
            courses.splice(index, 1);
            alert("Produit supprimé");
            saveAndRender();
        });

        listeElement.appendChild(li);
    });
}

function addProduct() {
    let valeurRaw = myInput.value.trim();
    let valeurLower = valeurRaw.toLowerCase();

    // Saisie vide interdite
    if (valeurRaw === "") {
        alert("Erreur de saisie");
        return;
    }

    // Recherche d'un article identique (sans tenir compte de la casse)
    let indexExistant = courses.findIndex(item => item.nom.toLowerCase() === valeurLower);

    if (indexExistant !== -1) {
        // Article déjà présent : on incrémente la quantité
        courses[indexExistant].quantite++;
        alert("Quantité mise à jour");
    } else {
        // Nouvel article avec quantité initiale à 1
        courses.push({
            nom: valeurRaw,
            quantite: 1,
            checked: false
        });
        alert("Produit ajouté");
    }

    myInput.value = "";
    saveAndRender();
}

// Ajout via le bouton
btn.addEventListener('click', addProduct);

// Ajout via la touche Entrée
myInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addProduct();
    }
});

// Affichage initial au chargement de la page
render();