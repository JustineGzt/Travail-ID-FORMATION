let a = 1
let b = 2


// 1er exercice Ecrire un programme qui prend deux nombres, les compares pour définir le nombre le plus grand des deux. Si égalité, affiche Egale

if (b > a) {
    console.log("b est plus grand que a");
}  else if (a < b) {
    console.log("a est plus plus que b");
} else {
    console.log("a est égale à b");
}


// 2ème Ecrire un programme qui vérifie si un utilisateur est majeur ou non

let c = 20
let d = 17


if (c > d) {
    console.log("L'utilisateur à 20 ans alors il est majeur");
}  else if (c < d) {
    console.log("L'utilisateur à 17 ans alors il est mineur");
}


// 3ème Ecrire un programme qui compare un prix de fabrication et le prix de vente pour déterminer la perte ou le profit d’un produit.

let prixDeVente = 12
let prixDeFabrication = 10

if (  prixDeVente > prixDeFabrication) {
    console.log("Profit de 12 €");
}  else (prixDeVente < prixDeFabrication) {
    console.log("Perte de 12 €");
}

// 4ème Ecrire un programme qui déclare une température et qui affiche un message en fonction de cette température :

let temperature = 13

if (temperature < 9 ) {
    console.log("Il fait froid");
} else if (temperature >= 10 && temperature > 25) {
    console.log("Il fait doux");
} else if (temperature == 13) {
    console.log("La température est de 13 degré. Elle est tempérée.");
}  else { temperature > 25
    console.log("Il fait chaud");
}


// 5ème Ecrire un programme qui gère les rôles d’un utilisateur et s’avoir s’il est connecté. S’il est connecté et uniquement s’il est admin alors il a l’accès total

let roleAd = "admin"
let roleUser = "user"
let isConnected = true
let isNotConnected = false

if ( isNotConnected ) {
    console.log("Accès refusé");
} else if (isConnected && roleUser === "user") {
    console.log("Accès total");
}  else { sConnected && roleAd === "admin"
    console.log("Accès limité");
}

//  6ème Ecrire un programme qui permet d’activer ou de désactiver un compte en une seule condition

let isActive = true
let isInactive = false

if (isActive) {
    console.log("Compte activé");
}  else if (isInactive) {
    console.log("Compte désactivé");
}

// 7ème Ecrire un programme qui analyse un panier et offre la livraison s’il le montant est supérieur à 100 euros. La livraison est de 5€, il faut ajouter la livraison si le prix est inférieur.

let montantPanier = 100

if (montantPanier > 120) {
    console.log("Livraison gratuite");
} else { montantPanier < 50
    console.log("Frais de livraison de 5 €");
}

// 8ème Ecrire un programme qui prendra une note qui affiche une mention selon la note :

let TresBien = 16
let Bien = 12
let Passable = 8
let Echec = 7

if (TresBien >= 16 || Bien < 15) {
    console.log("La note est de 17, la mention est Très Bien");
} else if (Bien >= 12 || Passable < 11) {
    console.log("La note est de 13, la mention est Bien");
} else if (Passable >= 8 || Echec < 7) {
    console.log("Passable");
} else { Echec < 7
    console.log("Échec");
}


// 9ème Ecrire un programme qui prend un nombre et définit s’il est pair ou impaire




// 10ème Ecrire un programme qui vérifie le stock d’un article.

let stockArticle = 10
let commandeArticle = 1
let ruptureStock = 0

if (stockArticle) {
    console.log("Demande : 1 | Stock : 10 -> Stock OK");
} else if (commandeArticle) {
    console.log("Demande : 1 | Stock : 1 -> Stock épuisé après vente");
} else { ruptureStock 
    console.log("Demande : 1 | Stock : 0 -> Rupture de stock, commande impossible");
}

// 11ème Ecrire un programme qui simule une calculatrice. Cette calculatrice exécutera des opérations arithmétiques de base selon l’opérateur choisis.




// 12ème Ecrire un programme qui vérifie si un triangle est valide selon les règles suivants :

let sideA = 5
let sideB = 5
let sideC = 5

if (sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA) {
    console.log("Triangle valide");
} else {
    console.log("Ce n'est pas un triangle");
}


// 13ème Ecrire un programme qui vérifie l’âge de l’utilisateur et détermine s’il a le droit à une réduction. Différents tarifs 

let gratuit = 12
let demiTarif = 26
let pleinTarif = 60
let tarifReduit = 65

let mois = 9.90
let troismois = 9.90 * 3 * 0.15
let annee = 9.90 * 12 - 2 * 9.90


if (gratuit < 12 ) {
    console.log("Tarif : Gratuit");
} else if (demiTarif >= 20 && pleinTarif < 60) {
    console.log("Age : 20 ans -> Tarif 1 ans = ? €");
} else if (pleinTarif >= 60 && tarifReduit < 61) {
    console.log("Tarif : Plein tarif");
} else { tarifReduit >= 61 
    console.log("Tarif : Tarif réduit");
}
    
// 14ème Ecrire un programme qui gère automatiquement un devis. Un client peut demander une ou plusieurs prestations.

let prestationA = 20;
let prestationB = 45;
let prestationC = 25;
let prestationD = 69;
let prestationE = 120;
let prestationF = 80;
let prestationG = 65;
let urgenceClient = 0.20 * 100 ;
let fideliteClient = 30;
let fraisAdministration = 2;
let fraisBancaire = 1.5 ;
let totalPrestation = prestationA + prestationB + prestationC + prestationD + prestationE + prestationF + prestationG;

console.log("Prestation client : Diagnostic simple, Nettoyage + dépoussiérage complet, Remplacement pâte thermique, Réinstallation Windows + drivers, Récupération de données, Remplacement SSD 500 Go, Remplacement alimentation 550W,   du devis est de " + totalPrestation + " €");

let totalDevis = prestationA + prestationB + prestationC + prestationD + prestationE + prestationF + prestationG + fraisAdministration + fraisBancaire ;
console.log("Le total du devis est de " + totalDevis + " €");


let remiseDevis = 0.15;

console.log("Le taux de remise appliqué est de " + (remiseDevis * 100) + " %");

let urgence = false;
let fidelite = true;

console.log( urgence ? "Oui." : "Non.");
console.log( fidelite ? "Oui." : "Non.");

let totalRemise = totalDevis - (totalDevis * remiseDevis);

console.log(" Prix total HT du devis " + totalRemise + " €"); 





// if ( urgence && fidelite) {
//     let totalFinalDevis = totalDevis + urgenceClient + fideliteClient;
//     console.log("Le total final du devis est de " + totalFinalDevis + " €");
// }

console.log( "Prix total TCC du devis " + (  totalRemise - fideliteClient )  )
