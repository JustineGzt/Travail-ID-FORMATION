document.addEventListener('DOMContentLoaded', () => {
  const cartes = window.CartesLib.getAll();

  const conteneurs = {
    question: document.querySelector('#question .cartes'),
    quiz: document.querySelector('#quiz .cartes'),
    devinette: document.querySelector('#devinette .cartes'),
    mystere: document.querySelector('#mystere .cartes'),
    creatif: document.querySelector('#creatif .cartes'),
    defi: document.querySelector('#defi .cartes')
  };

  cartes.forEach(carte => {
    const div = document.createElement('div');
    div.classList.add('carte');
    if (carte.statut === "terminee") div.classList.add('terminee');

    div.innerHTML = `
      <div class="titre">${carte.titre}</div>
      <div class="statut">${carte.statut}</div>
      <div class="mission">${carte.missionRevelee ? carte.mission : "❓ Mission cachée"}</div>
      <div class="btns">
        <button class="valider">✅ Valider</button>
        <button class="plus-tard">🕒 Plus tard</button>
        <button class="creative">🎨 Créative</button>
      </div>
    `;

    // Actions des boutons
    div.querySelector('.valider')?.addEventListener('click', () => {
      window.CartesLib.mettreAJourStatutCarte(carte.id, "terminee", true);
      location.reload();
    });
    div.querySelector('.plus-tard')?.addEventListener('click', () => {
      window.CartesLib.mettreAJourStatutCarte(carte.id, "attente");
      location.reload();
    });
    div.querySelector('.creative')?.addEventListener('click', () => {
      window.CartesLib.mettreAJourStatutCarte(carte.id, "creative");
      location.reload();
    });

    if (conteneurs[carte.type]) conteneurs[carte.type].appendChild(div);
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const categories = ["question", "quiz", "devinette", "mystere", "creatif"];
  const conteneurs = {};

  categories.forEach(cat => {
    conteneurs[cat] = document.querySelector(`#${cat} .cartes`);
  });

  // Récupération de l'inventaire dans localStorage
  let cartesData = JSON.parse(localStorage.getItem("cartesInventaire")) || [];

  // Si inventaire vide, créer 5 cartes par catégorie avec mission cachée
  if (cartesData.length === 0) {
    cartesData = categories.flatMap(cat =>
      Array.from({ length: 5 }, (_, i) => ({
        id: `${cat}-${i}`,                // ID unique
        type: cat,
        titre: `${cat.charAt(0).toUpperCase() + cat.slice(1)} n°${i + 1}`,
        mission: `Mission secrète pour ${cat} n°${i + 1}`, // mission cachée
        statut: "🕓 À faire",            // statut initial
        missionRevelee: false            // mission cachée par défaut
      }))
    );
    localStorage.setItem("cartesInventaire", JSON.stringify(cartesData));
  }

  // Fonction pour créer la carte HTML
  function creerCarte(carte) {
    const div = document.createElement("div");
    div.classList.add("carte");
    if (carte.statut === "✅ Validée") div.classList.add("terminee");
    if (carte.statut === "🎨 Créative") div.classList.add("creative");

    div.innerHTML = `
      <div class="titre">${carte.titre}</div>
      <div class="statut">${carte.statut}</div>
      <div class="mission">${carte.missionRevelee ? carte.mission : "❓ Mission cachée"}</div>
      <div class="btns">
        <button class="valider">✅ Valider</button>
        <button class="plus-tard">🕒 Plus tard</button>
        <button class="creative">🎨 Créative</button>
      </div>
    `;

    const container = conteneurs[carte.type];
    if (container) container.appendChild(div);

    // Boutons d’action
    div.querySelector(".valider").addEventListener("click", () => majStatut(carte.id, "✅ Validée", true));
    div.querySelector(".plus-tard").addEventListener("click", () => majStatut(carte.id, "🕓 À faire"));
    div.querySelector(".creative").addEventListener("click", () => majStatut(carte.id, "🎨 Créative"));
  }

  // Affichage des cartes
  cartesData.forEach(creerCarte);

  // Fonction de mise à jour du statut et révélation mission
  function majStatut(id, nouveauStatut, revealMission = false) {
    let data = JSON.parse(localStorage.getItem("cartesInventaire"));
    const index = data.findIndex(c => c.id === id);
    if (index !== -1) {
      data[index].statut = nouveauStatut;
      if (revealMission) data[index].missionRevelee = true;
      localStorage.setItem("cartesInventaire", JSON.stringify(data));
      location.reload(); // rafraichir pour afficher mission si validée
    }
  }
});
