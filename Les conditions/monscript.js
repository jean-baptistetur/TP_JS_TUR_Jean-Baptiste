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
// let age = Number(prompt("Renseignez votre âge : "));

// if (age < 18) {
//     alert(`L’utilisateur a ${age} an(s), il est mineur !`);
// } else if (age >= 62) {
//     alert(`L’utilisateur a ${age} ans, il est majeur mais aussi retraité !!`);
// } else {
//     alert(`L’utilisateur a ${age} ans, il est majeur !`);
// }


//TP 10 : ELSE IF ET SWITCH

// avec IF et ELSE
// let age = Number(prompt("Renseignez votre âge :"));

// if (age < 18) {
//     alert(`L’utilisateur a ${age} ans, il est mineur !`);
// } else if (age === 18) {
//     alert("Il vient d’être majeur");
// } else if (age === 25) {
//     alert("Il a un quart de siècle");
// } else if (age === 50) {
//     alert("Il a un demi siècle");
// } else if (age === 62) {
//     alert("Il vient d’être à la retraite");
// } else if (age === 100) {
//     alert("Il vient d’être centenaire");
// } else {
//     alert(`L’utilisateur a ${age} ans, il est majeur !`);
// }

// Avec switch 
let age = Number(prompt("Renseignez votre âge :"));

switch (age) {
    case 18:
        alert("Il vient d’être majeur");
        break;
    case 25:
        alert("Il a un quart de siècle");
        break;
    case 50:
        alert("Il a un demi siècle");
        break;
    case 62:
        alert("Il vient d’être à la retraite");
        break;
    case 100:
        alert("Il vient d’être centenaire");
        break;
    default:
        if (age < 18) {
            alert(`L’utilisateur a ${age} ans, il est mineur !`);
        } else {
            alert(`L’utilisateur a ${age} ans, il est majeur !`);
        }
}
