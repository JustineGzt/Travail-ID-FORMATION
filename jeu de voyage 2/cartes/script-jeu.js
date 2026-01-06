// Import des cartes par catégorie
import { cartesQuiz } from './cartes/card-1.1.js';
import { cartesDevinette } from './cartes/card-2.1.js';
// tu peux ajouter d'autres catégories ici

// Combiner toutes les cartes dans un tableau unique
const toutesLesCartes = [...cartesQuiz, ...cartesDevinette];

// Inventaire du joueur
const inventaire = [];

// Fonction pour gérer les actions du joueur
function gererCarte(carte, action) {3
  if (action === "accepter") {
    console.log(`Carte jouée ! Tu gagnes ${carte.points} points.`);
    carte.dansInventaire = false;
  } else if (action === "refuser") {
    console.log("Carte refusée.");
  } else if (action === "plus-tard") {
    console.log("Carte mise dans l'inventaire.");
    carte.dansInventaire = true;
    if (!inventaire.includes(carte)) {
      inventaire.push(carte);
    }
  }
}

// Fonction pour afficher toutes les cartes dans le container HTML
function afficherCartes() {
  const container = document.getElementById("jeu");
  container.innerHTML = ''; // vider le container avant affichage

  toutesLesCartes.forEach(carte => {
    const div = document.createElement("div");
    div.classList.add("carte");
    div.style.backgroundColor = carte.couleur;
    div.textContent = carte.texte;

    // Au clic sur la carte
    div.onclick = () => {
      const action = prompt("Tape : accepter / refuser / plus-tard");
      gererCarte(carte, action);
      afficherCartes(); // rafraîchir l'affichage après action
    };

    container.appendChild(div);
  });
}

// Afficher l’inventaire si besoin
function afficherInventaire() {
  console.log("Inventaire actuel :", inventaire.map(c => c.id));
}

// Lancer l’affichage au chargement de la page
window.onload = () => {
  afficherCartes();
  // Si tu veux afficher l’inventaire dans la console régulièrement
  setInterval(afficherInventaire, 10000); // toutes les 10 secondes
};


