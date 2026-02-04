//TP8 : LES OPÉRATEURS DE COMPARAISON
// let number = 5;
// let text = '5';
// let isRainingToday = true;

// if(number == text){
//     console.log("Vrai pour les valeurs");
// }else{
//     console.log("Faux pour les valeurs");
// }

// if(number === text){
//     console.log("Vrai pour les valeurs et le type");
// }else{
//     console.log("Faux pour les valeurs ou le type");
// }


//TP9 : LES OPÉRATEURS LOGIQUES
let age = Number(prompt("Renseignez votre âge : "));

if (age < 18) {
    alert(`L’utilisateur a ${age} an(s), il est mineur !`);
} else if (age >= 62) {
    alert(`L’utilisateur a ${age} ans, il est majeur mais aussi retraité !!`);
} else {
    alert(`L’utilisateur a ${age} ans, il est majeur !`);
}
