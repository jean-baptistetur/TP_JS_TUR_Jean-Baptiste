let dateJour = new Date(Date.now());
let dateJourFr = dateJour.toLocaleDateString('fr-FR');
let titre = document.querySelector("h2");
titre.textContent = titre.textContent + " : " + dateJourFr;

let myInput = document.querySelector("#myInput");
let btn = document.querySelector(".addBtn");
let listeElement = document.querySelector("#listeCourses");

// Chargement des données au démarrage
let courses = JSON.parse(localStorage.getItem("liste_courses")) || [];

function saveAndRender() {
    localStorage.setItem("liste_courses", JSON.stringify(courses));
    render();
}

function render() {
    listeElement.innerHTML = "";
    courses.forEach((item, index) => {
        let li = document.createElement("li");
        let texteAffichage = item.nom;
        if (item.quantite > 1) {
            texteAffichage += ` (x${item.quantite})`;
        }
        li.textContent = texteAffichage;
        
        if (item.checked) {
            li.classList.add("itemCheck");
        }

        li.addEventListener('click', () => {
            courses[index].checked = !courses[index].checked;
            saveAndRender();
        });

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

    if (valeurRaw === "") {
        alert("Erreur de saisie");
        return;
    }

    // Vérification des doublons (insensible à la casse)
    let indexExistant = courses.findIndex(item => item.nom.toLowerCase() === valeurLower);

    if (indexExistant !== -1) {
        courses[indexExistant].quantite++;
        alert("Quantité mise à jour");
    } else {
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

btn.addEventListener('click', addProduct);

myInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addProduct();
    }
});

// Premier affichage
render();