const nombres = ["1", "2", "3", "4", "5" , "6", "7", "8", "9"];
nombres.forEach((nombre, index) => {
    console.log(index, nombre);
});

// 2
let panier =  "";
let p = 10 ;

for(let i = 1; i < p ; i++){
    console.log(`${p}`);
};


// "
// 
let v = 5 ;

for(let i = v - 1; i >= 1; i--){
    let ligne = "";
    for(let j = 1; j <= i; j++){
        ligne += "";
    }
    console.log(ligne);    
};

 
// let argents = 5 ;
// let totalargentsjs = 0 ;
// let jours = 7 ;
// let totalargentsS = 0 ;
// let semaines = 4;
// let totalargentsM = 0 ;



// for(let i = 1; i <= argents; i++){
//     console.log(jours * argents );
// } for(const argent of argents){
//     totalargentsjs += argent;
// } let totalargentsj = totalargentsj * semaines;
// console.log(`Sommes : ${totalargentsj}`);
// console.log(`Moyenne : ${moyenne}`);

// }; for(let i = 1; i <= argents; i++){
//     console.log(semaines * argents)
// }

// const joursSemaine = 7;

// const joursMois = 30;

// const joursAn = 365;

// const sommeSemaine = eurosParJour * joursSemaine;
// const sommeMois = eurosParJour * joursMois;
// const sommeAn = eurosParJour * joursAn;

// console.log(`Si tu mets de côté ${eurosParJour} € par jour :`);
// console.log(`- En une semaine (7 jours) : ${sommeSemaine} €`);
// console.log(`- En un mois (30 jours) : ${sommeMois} €`);
// console.log(`- En un an (365 jours) : ${sommeAn} €`);


const eurosParJour = 5;

const joursSemaine = 7;

const joursMois = 30;

const joursAn = 365;

const sommeSemaine = eurosParJour * joursSemaine;
const sommeMois = eurosParJour * joursMois;
const sommeAn = eurosParJour * joursAn;

console.log(`Si tu mets de côté ${eurosParJour} € par jour :`);
console.log(`- En une semaine (7 jours) : ${sommeSemaine} €`);
console.log(`- En un mois (30 jours) : ${sommeMois} €`);
console.log(`- En un an (365 jours) : ${sommeAn} €`);


// 5

const moutons = [true, true, true, false, true, true, true, true , true, false, true, false, true, false, false, true, true, true, true, true , false, false, true, true];
let compte = 0;

for (let i = 0; i < moutons.length; i++) {
    if (moutons[i] === true) {
        compte++;
    }
}

console.log(`Nombre de moutons présents : ${compte}`);


// 6
// let compteur = 0;

// const boites = 15;

// while (boites < 5) {
//     console.log("Compteur = " - boites);
//     compteur++;  // on augmente sinon ça tourne à l'infini

//        if (i === 5) {
//         console.log("Stop, on a trouvé 6 !");
//         break; // coupe la boucle
//     }
//      i++;
// }   


// while(boites < 3){
//     console.log(boites);
    
//         if (i === 5) {
//         console.log("Stop, on a trouvé 6 !");
//         break; // coupe la boucle
//     }
//      i++;
// };



// let boites = 15;

// while (boites < 10) {
//     console.log(i);

//     if (boites === 6) {
//         console.log("Stop, on a trouvé 6 !");
//         break; // coupe la boucle
//     }

//     i++; // très important pour éviter boucle infinie
// }


let start = 15;
let stop = 5;

let i = start;


while (true) {
    console.log(i);
    if (i === stop) {
        break;
    }
    
    i--;     
}


// 7

const alice = true; 
const bob = true; 
const charlie = true;

const prenoms = [alice, bob, charlie ]

const connected = true


for(let i = 0; i < 3; i++){
    console.log(i);
    if (prenoms[i] === true) {
        console.log("cest ok")
    }
        else {
            console.log("néan")
        } 
        
    }

// 8


// const Lait = 1; 
// const Pain = 2; 
// const Oeufs = 3;
// const JusDorange = 2;

// const a = Lait; 
// const b = Pain; 
// const c = Oeufs;
// const d = JusDorange;

const nomsArticles  = [ "JusDorange", "Pain", "Oeufs", "Lait" ]
const scanne = [true, true, true, true];

for(let i = 0; i < nomsArticles.length; i++){
    console.log(i);
    if (scanne[i] === true) {
        console.log(`Article scanné : ${nomsArticles[i]}`)
    }
        else {
            console.log("Article pas scanné")
        } 
        
    }


 
// 9

const couleurs  = [ "bleu", "vert", "rouge" ]

couleurs.reverse();
console.log(couleurs); 


// 10
const categorieA = "recyclable";
const categorieB = "verre";
const categorieC = "non recyclable";

const dechets = [ 
    {nom: "Plastique", categorie: categorieA },
    {nom: "Verre", categorie: categorieB },
    {nom: "Papier", categorie: categorieA },
    {nom: "Métal", categorie: categorieA },
    {nom: "Carton", categorie: categorieA },
    {nom: "Peau de banane", categorie: categorieC },

]


const recyclables = dechets.filter(d => d.categorie === categorieA);
const verre = dechets.filter(d => d.categorie === categorieB);
const nonRecyclables = dechets.filter(d => d.categorie === categorieC);

console.log("♻️ Recyclables :", recyclables);
console.log("🟩 Verre :", verre);
console.log("🗑️ Non recyclables :", nonRecyclables);


// 11




// const temperature = [ 
//     {temps: 2, boulehin: true }, // boolean
//     {temps: 7, boulehin: true },
//     {temps: -3, boulehin: false },
//     {temps: -5, boulehin: false },
//     {temps: 4, boulehin: true },
// ]
const temperature = [2, 7, -3, -5, 4]


let valeurProcheZero = temperature[0].temps;

for (let i = 0; i < temperature.length; i++) {
    if ((temperature[i] >= 0 ? temperature[i] : -temperature[i]) 
    < (valeurProcheZero >= 0 ? valeurProcheZero : -valeurProcheZero)) {
    valeurProcheZero = temperature[i];
    }




    if (temperature[i].temps > 0) {
        console.log(`${temperature[i].temps} : Positive`);
    } else if (temperature[i].temps < 0) {
        console.log(`${temperature[i].temps} : Négative`);
    } else {
        console.log(`${temperature[i].temps} : C'est zéro !`);
    }
}


