
let nomJour = "Mercredi";
let numJour = 4;
let nomMois = "Février";
let isHiver = true;

console.log(nomJour);
console.log(numJour);
console.log(nomMois);
console.log(isHiver);


let tabJours = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche"
];


let tabMois = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre"
];


console.log(tabJours[2]);


console.log(tabMois[1]);


let maDateV1 = {
  jour: nomJour,
  mois: nomMois
};


let maDateV2 = new Object();
maDateV2.jour = tabJours[2];
maDateV2.mois = tabMois[1];

console.log(maDateV1);
console.log(maDateV2);
