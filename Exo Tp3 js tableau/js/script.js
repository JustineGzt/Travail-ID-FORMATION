// Exercice 1 : Créer un tableau outils qui contient marteau, tournevis et clou et affiche uniquement marteau en console.

let outils =   ["marteau" , "tournevis", "clou"];
console.log(outils[0]);

// Exercice 2 : Utilise le même tableau outils et remplace clou par vis et affiche le résultat en console.

outils[2] = "vis" 

// Exercice 3 : Utilise le même tableau outils et ajoute boulon à la fin et affiche le résultat en console.

outils.push("boulon");
console.log(outils);


// Exercice 4 : Utilise le même tableau outils et ajoute pince au début et affiche le résultat en console.

outils.unshift("mangue");
console.log(outils);

// Exercice 5 : Utilise le même tableau et supprime le dernier élément et affiche le résultat en console.


outils.pop();
console.log(outils);

// Exercice 6 : Utilise le même tableau et supprime le premier élément et affiche le résultat en console. 

outils.shift();
console.log(outils);


// Exercice 7 : Utilise le même tableau et vérifie si tournevis est présent et affiche le résultat en console.

console.log(outils.indexOf("tournevis"));


// Exercice 8 : Utilise le même tableau et trouve l’index de clou et affiche le résultat en console.

console.log(outils.includes("clou"));

// Exercice 9 : Crée un nouveau tableau qui contient marteau, tournevis , clou  et vis . Avec ce tableau crée un autre nouveau tableau avec uniquement tournevis, clou.
let outils2 =   ["marteau" , "tournevis", "clou", "vis"];


console.log(outils2.slice(1, 3 ));


// Exercice 10 Utilise le tableau obtenu en résultat de l’exercice 9 et remplace clou par marteau avec splice.

console.log(outils2.splice(0, 1));


// Exercice 11 :
let animaux =   ["chien " , "chat ", "clou", "vis"];
animaux.push("lapin");
animaux.push("hamster");

animaux[0] = "loup";
console.log(animaux);



// Exercice 12 : Crée un tableau scores qui contient 10, 20, 30, 40 et 50. Retire le premier et dernier élément puis ajoute 60 au début.

let scores = [10, 20, 30, 40, 50];
scores.shift();
scores.pop();
scores.unshift(60);

console.log(scores);

// Exercice 13 : Crée un tableau couleurs qui contient rouge, vert, bleu et vert supprime seulement le premier élément. Utilise uniquement les propriétés indexOf et splice.

let couleurs = ["rouge", "vert", "bleu", "vert"];

couleurs.splice(couleurs.indexOf("rouge"), 1);

console.log(couleurs);

// Exercice 14 : Crée un tableau prix qui contient 12, 5, 20 et 15. Avec ce tableau crée un nouveau tableau contenant uniquement les valeurs centrales (sans le premier et le dernier). 

let prix = [12, 5, 20, 15];

// Exercice 15 : Crée un tableau jours qui contient lundi, mardi et vendredi. Insérer mercredi et jeudi entre vendredi sans remplacer.

let jours = ["lundi", "mardi", "vendredi"];

jours.splice(2, 0, "mercredi", "jeudi");

console.log(jours);

// Exercice 16 Crée un tableau stock qui contient souris, clavier, casque et écran et effectuer toutes ces actions dans l’ordre :

let stock = ["souris", "clavier", "casque", "écran"];

stock.unshift("tapis");

stock.push("webcam");
stock.push("micro");

stock[2] = "clavier mécanique";

console.log(stock.splice(3, 1));

let stock2 = ["clavier mécanique", "écran"];

console.log(stock2.indexOf("micro")); 

stock2.splice(1, 1, "écran 144hz");
console.log(stock2);
