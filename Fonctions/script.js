function demanderAnnee() {
    let annee = prompt("Bonjour, indique ton année de naissance :");
    calcul(annee);
}

function calcul(annee) {
    let age = new Date().getFullYear() - annee;
    alert("Votre âge : " + age);
}

demanderAnnee();