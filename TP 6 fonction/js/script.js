// Exercice 1 : Écris une fonction nommée direBonjour qui ne prend aucun paramètre et qui affiche "Bonjour tout le monde !" dans la console.

function direBonjour(){

}

direBonjour("Bonjour tout le monde !");

// Exercice 1 : Écris une fonction nommée saluer qui prend un paramètre prenom. La fonction doit retourner la chaîne de caractères : "Bonjour [prenom] !".

function saluer(prenom = "bob"){
    console.log(`Bonjour  ${prenom}`);

}

saluer()


// Exercice 3 :  Écris une fonction additionner qui prend deux nombres en paramètres et retourne leur somme.


function additionner(a, b) {
  return a * b;
}

let result = additionner(4, 5);
console.log(result); 


// 4


function estPair(a){
    console.log(a);
    if (estPair % 2 === 0) {
    console.log("Pair");
        } else {
            console.log("Impair");
        }
        return a;
}

let resultat = estPair(2);
console.log(resultat)


// 5 Écris une fonction calculerSurface qui prend deux paramètres : longueur et largeur. Elle doit retourner la surface. Si aucune largeur n’est fourni, considère que c’est un carré.

const calculerSurface = function(x) {
  return x * x;
};

console.log(calculerSurface(6)); 


// 6 Écris une fonction trouverMax qui prend trois nombres en paramètres et retourne le plus grand des trois.



function trouverMax (a, b , c) {
    if (a >= b && a >= c) {
    max = a;
    } else if (b >= a && b >= c) {
        max = b;
        } else {
            max = c;
        }
        return max;
    }
let resul = trouverMax(3, 5, 2);
console.log(resul)

// 7 Écris une fonction convertirEnSecondes qui prend un nombre d'heures et un nombre de minutes, et retourne le total en secondes.

function convertirEnSecondes ( heures, minutes ) {
    let total = (heures * 3600) + (minutes * 60);
    return total;
    }
let resultats = convertirEnSecondes( 1 , 60 );
console.log(resultats)


// 8






// 9 


// function additionner(a, b) {
//   return a * b;
// }

// let result = additionner(4, 5);
// console.log(result); 

// const additionner = (a, b) => {
//     return a + b
// }
// let resultAD = additionner(4, 5);
// console.log(resultAD); 



const additionne = (a, b) => a + b 

console.log(additionne (2, 3))
// additionne()


// 10


const nombres = [-1, 4, 0, -5, 12];

const filtrerPositifs = (tableau) => {
    return tableau.filter((n) => n > 0);
};

const resultatPositif = filtrerPositifs(nombres);
console.log(resultatPositif); 

// 11  

// 12

const calculerMoyenne = (tableau) => {
    let sommemoyenne = 0;

    for (let i = 0; i < tableau.length; i++) {
        sommemoyenne = sommemoyenne + tableau[i];
    }

    return sommemoyenne / tableau.length;
};
console.log(calculerMoyenne([10, 12, 16]));

// Exercice 13 :

const executerOperation = (a , b, operation) => {
        //  return a + b;
        return operation(a, b)
}

// executerOperation(4 ,5, operation(x){
// console.log(x)
// });

const addition = (a, b) => a + b;

const multiplication = (a, b) => a * b;


// executerOperation(4, 5, operation);
// function multiplication(a, b, operation)  {
//     return a * b;
// }
console.log("Addition :", executerOperation(4, 5, addition));  
console.log("Multiplication :", executerOperation(4, 5, multiplication));



// 15

const compte = {
        nom : "bob",
        solde : 0,
        afficherSolde: function() {
        console.log("Solde :", this.solde);
     },
        afficher() {
            console.log(`Compte de  ${this.solde} €`);
        },
         deposer(montant) {
        if (montant > 0) {
            this.solde += montant;
        } else {
            console.log("Montant invalide !");
        }
        },
           retirer(montant) {
        if (montant <= this.solde) {
            this.solde -= montant;
        } else {
            console.log("Solde insuffisant !");
        }
        }
    
}

compte.deposer(700);
compte.retirer(200);
compte.afficher(); 
// afficherSolde.retirer(400); // Solde insuffisant !
// afficherSolde.afficher(500);   // Compte de Bob : 300 €
