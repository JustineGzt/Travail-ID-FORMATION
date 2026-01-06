// -----------------------------
// mission-index.js
// -----------------------------

// Navigation
document.getElementById('btn-accueil').addEventListener('click', () => {
    window.location.href = 'index.html';
});


// Sélecteurs
const missionContainer = document.getElementById('cartes-wrapper');
const miniNav = document.getElementById('categorie-nav');

// Profil utilisateur
let profil = JSON.parse(localStorage.getItem("profil")) || {
    nom: "Justine",
    missionsValidees: []
};

// Liste des missions (si tu veux charger JSON, remplacer par fetch)
const missions = [
    { titre: "Explore la forêt", description: "Pars explorer une forêt pendant 30 minutes.", categorie: "aventure", type: "Aventure" },
    { titre: "50 pompes", description: "Fais 50 pompes aujourd'hui.", categorie: "sport", type: "Sport" },
    { titre: "Méditation", description: "Fais 10 minutes de méditation.", categorie: "bien-être", type: "Bien-être" }
];

// -----------------------------
// Sauvegarder profil
// -----------------------------
function sauvegarderProfil() {
    localStorage.setItem("profil", JSON.stringify(profil));
}

// -----------------------------
// Créer une carte mission
// -----------------------------
function creerCarte(mission) {
    const card = document.createElement('div');
    card.classList.add('mission-card', `cat-${mission.categorie.toLowerCase()}`);

    // Contenu HTML de la carte
    card.innerHTML = `
        <div class="mission-header">
            <h3>${mission.titre}</h3>
            <span class="mission-type">${mission.type}</span>
        </div>
        <p class="mission-description">${mission.description}</p>
        <div class="mission-footer">
            <button class="btn-accept">Accepter</button>
            <button class="btn-skip">Passer</button>
        </div>
    `;

    // Forcer une taille uniforme pour toutes les cartes
    card.style.height = "300px";       // hauteur fixe
    card.style.padding = "65px";       // padding fixe
    card.style.boxSizing = "border-box"; // pour que padding + border soient inclus dans la hauteur

    // Ajouter la carte sans effacer les autres
    missionContainer.appendChild(card);

    // Boutons
    card.querySelector('.btn-accept').addEventListener('click', () => {
        alert('Mission acceptée !');
        profil.missionsValidees.push(mission.titre);
        sauvegarderProfil();
    });

    card.querySelector('.btn-skip').addEventListener('click', () => {
        card.remove();        // supprime la carte actuelle
        afficherMission();    // tire une nouvelle mission aléatoire
    });
}


// -----------------------------
// Tirer mission aléatoire
// -----------------------------
function tirerMission(categorie = null) {
    let missionsFiltres = missions;
    if(categorie) {
        missionsFiltres = missions.filter(m => m.categorie.toLowerCase() === categorie.toLowerCase());
    }
    if(missionsFiltres.length === 0) return null;
    return missionsFiltres[Math.floor(Math.random() * missionsFiltres.length)];
}

// -----------------------------
// Afficher mission
// -----------------------------
function afficherMission(categorie = null) {
    const mission = tirerMission(categorie);
    if(mission) creerCarte(mission);
}

// -----------------------------
// Créer mini-nav catégories
// -----------------------------
function creerMiniNav() {
    const categories = [...new Set(missions.map(m => m.categorie))];
    miniNav.innerHTML = ''; // supprime anciennes catégories
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.addEventListener('click', () => {
            missionContainer.innerHTML = ''; // supprime les cartes existantes
            afficherMission(cat);           // affiche une nouvelle carte filtrée
        });
        miniNav.appendChild(btn);
    });
}


// -----------------------------
// Initialisation
// -----------------------------
creerMiniNav();
afficherMission();
