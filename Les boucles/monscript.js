// //TP 11 : 
// let somme100 = 0;
// let i = 1;
// while (i <= 100) {
//     somme100 = somme100 + i++;
// }
// alert(`Somme des 100 premiers entiers ==> ${somme100}`);

// let n;
// do {
//     n = prompt("Nombre entre 1 et 100 :");
// } while (n < 1 || n > 100);

// let sommeX = 0;
// let j = 1;
// while (j <= n) {
//     sommeX = sommeX + j++;
// }
// alert(sommeX);


// //TP 12 :
// let tableau = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// console.log(tableau[0]);
// console.log(tableau[1]);
// console.log(tableau[2]);
// console.log(tableau[3]);
// console.log(tableau[4]);
// console.log(tableau[5]);
// console.log(tableau[6]);
// console.log(tableau[7]);
// console.log("\n");

// console.log("for normal");
// for (let i = 0; i < 8; i++) {
//   console.log(tableau[i]);
// }
// console.log("\n");

// console.log("for avec lenght");
// for (let i = 0; i < tableau.length; i++) {
//   console.log(tableau[i]);
// }

function demanderAnnee() {
    let annee = prompt("Bonjour, indique ton année de naissance :");
    calcul(annee);
}

function calcul(annee) {
    let age = new Date().getFullYear() - annee;
    alert("Votre âge : " + age);
}

demanderAnnee();