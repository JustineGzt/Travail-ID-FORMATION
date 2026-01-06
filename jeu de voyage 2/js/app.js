// -------------------- VARIABLES --------------------
const categoryBtns = document.querySelectorAll('.category-btn');
const playerBtns = document.querySelectorAll('.player-btn');
const drawBtn = document.getElementById('drawCard');
const card = document.querySelector('.card');
const cardResult = document.querySelector('.card-result');
const scoreMe = document.getElementById('scoreMe');
const scoreFriend = document.getElementById('scoreFriend');
const validateBtn = document.getElementById('validateAnswer');
const playerAnswer = document.getElementById('playerAnswer');
const feedback = document.querySelector('.feedback');
const successBtns = document.querySelector('.success-section');

const successYes = document.getElementById('successYes');
const successNo = document.getElementById('successNo');

let selectedCategory = null;
let selectedPlayer = null;
let activePlayer = null;
let currentCard = null;
let currentAnswer = null;

let score = { moi: 0, ami: 0 };

// -------------------- CARTES --------------------
const cards = {
  question: [
    "Quel est ton rêve secret ?",
    "Quelle est ta peur la plus grande ?",
    "Si tu pouvais changer une chose, laquelle ?"
  ],
  quiz: [
    { question: "Capitale de la France ?", answer: "Paris" },
    { question: "2+2 ?", answer: "4" }
  ],
  devinette: [
    { riddle: "Je suis toujours devant toi mais invisible. Qui suis-je ?", answer: "Le futur" }
  ],
  mystere: [
    "Une énergie étrange t'entoure...",
    "Tu sens un frisson magique..."
  ],
  defi: [
    "Fais 10 pompes !",
    "Tiens-toi en équilibre sur un pied pendant 15 secondes !"
  ],
  creatif: [
    "Invente une courte chanson sur le moment présent.",
    "Dessine avec les yeux fermés pendant 10 secondes !"
  ]
};

// -------------------- SELECTION --------------------
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedCategory = btn.dataset.category;
    checkReady();
  });
});

playerBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    playerBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedPlayer = btn.dataset.player;
    checkReady();
  });
});

function checkReady() {
  drawBtn.disabled = !(selectedCategory && selectedPlayer);
}

// -------------------- TIRAGE DE CARTE --------------------
drawBtn.addEventListener('click', () => {
  feedback.textContent = '';
  playerAnswer.value = '';
  activePlayer = selectedPlayer;
  successBtns.style.display = 'none';

  if (selectedCategory === "quiz") {
    const randomCard = cards.quiz[Math.floor(Math.random() * cards.quiz.length)];
    currentCard = randomCard.question;
    currentAnswer = randomCard.answer;
  } else if (selectedCategory === "devinette") {
    const randomCard = cards.devinette[Math.floor(Math.random() * cards.devinette.length)];
    currentCard = randomCard.riddle;
    currentAnswer = randomCard.answer;
  } else {
    const arr = cards[selectedCategory];
    currentCard = arr[Math.floor(Math.random() * arr.length)];
    currentAnswer = null;
  }

  // Affiche le texte de la carte
  card.querySelector('.card-back .card-result').textContent = currentCard;

  // Affiche input seulement si Quiz/Devinette
  document.querySelector('.answer-section').style.display = 
    (selectedCategory === "quiz" || selectedCategory === "devinette") ? 'block' : 'none';

  // Affiche les boutons de réussite pour Question/Mystère/Défi/Créatif
  successBtns.style.display = 
    (["question", "mystere", "defi", "creatif"].includes(selectedCategory)) ? 'flex' : 'none';

  card.classList.add('flipped');

  // Reset sélection
  selectedCategory = null;
  selectedPlayer = null;
  categoryBtns.forEach(b => b.classList.remove('selected'));
  playerBtns.forEach(b => b.classList.remove('selected'));
  drawBtn.disabled = true;
});

// -------------------- VALIDATION REPONSE --------------------
validateBtn.addEventListener('click', () => {
  const answer = playerAnswer.value.trim().toLowerCase();
  if (!currentAnswer) return;

  if (answer === currentAnswer.toLowerCase()) {
    feedback.textContent = '✅ Correct !';
    feedback.style.color = 'limegreen';
    score[activePlayer]++;
  } else {
    feedback.textContent = `❌ Incorrect ! La bonne réponse était : ${currentAnswer}`;
    feedback.style.color = 'crimson';
  }

  updateScore();

  document.querySelector('.answer-section').style.display = 'none';

  setTimeout(() => {
    card.classList.remove('flipped');
    feedback.textContent = '';
  }, 3000);
});

// -------------------- VALIDATION SUCCÈS / ÉCHEC --------------------
successYes.addEventListener('click', () => {
  feedback.textContent = '✅ Réussi ! Bien joué !';
  feedback.style.color = 'limegreen';
  score[activePlayer]++;
  updateScore();
  closeCard();
});

successNo.addEventListener('click', () => {
  feedback.textContent = '❌ Raté !';
  feedback.style.color = 'crimson';
  closeCard();
});

function closeCard() {
  successBtns.style.display = 'none';
  setTimeout(() => {
    feedback.textContent = '';
    card.classList.remove('flipped');
  }, 2000);
}

// -------------------- UPDATE SCORE --------------------
function updateScore() {
  scoreMe.textContent = score.moi;
  scoreFriend.textContent = score.ami;
}

document.addEventListener("DOMContentLoaded", () => {
  let selectedCategory = null;
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedCategory = btn.dataset.category;
      document.getElementById("drawCard").disabled = false;
    });
  });

  document.getElementById("drawCard").addEventListener("click", () => {
    const titre = "Carte " + Date.now(); // remplace par le vrai contenu tiré
    const id = `${selectedCategory || "carte"}-${Date.now()}`;

    // afficher résultat dans l'UI
    document.querySelector(".card-front p").textContent = titre;
    document.querySelector(".card-result").textContent = titre;

    // enregistrer dans le localStorage via la lib
    if (window.CartesLib && window.CartesLib.ajouterCarteInventaire) {
      window.CartesLib.ajouterCarteInventaire({
        id,
        type: selectedCategory || "inconnu",
        titre,
        statut: "attente"
      });
    }

    // mise à jour visuelle optionnelle de l'inventaire sur la page
  });

  // conserve la dernière carte tirée (sera rempli par la logique de tirage si déjà implémentée)
  let lastCard = { id: null, type: null, titre: null };

  // si votre logique de "tirer la carte" existe ailleurs, assurez-vous qu'elle alimente lastCard et les data-* de .card
  // Ce petit secours capture l'affichage actuel après un tirage.
  const captureCard = () => {
    const titre = document.querySelector('.card-result')?.textContent?.trim() ||
                  document.querySelector('.card-front p')?.textContent?.trim() ||
                  lastCard.titre ||
                  'Carte sans titre';
    const cardEl = document.querySelector('.card');
    const type = cardEl?.dataset?.type || lastCard.type || 'inconnu';
    const id = cardEl?.dataset?.id || lastCard.id || `carte-${Date.now()}`;
    lastCard = { id, type, titre };
    if (window.CartesLib && window.CartesLib.ajouterCarteInventaire) {
      window.CartesLib.ajouterCarteInventaire(lastCard);
    }
  };

  // Appel sécurisé de captureCard sur succès/échec
  successYes.addEventListener('click', captureCard);
  successNo.addEventListener('click', captureCard);

  // Gestion du tirage de carte
  document.getElementById('drawCard').addEventListener('click', () => {
    try {
      const selectedCategory = document.querySelector('.category-btn.selected')?.dataset?.category;
      if (!selectedCategory) throw new Error('Aucune catégorie sélectionnée');

      // Logique de tirage de carte ici
      console.log('Tirer une carte de la catégorie:', selectedCategory);
    } catch (err) {
      console.error('Erreur lors du tirage de carte:', err);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // données de cartes (exemples — remplace / étends)
  const CARDS = {
    question: [
      { id: 'question-1', type: 'Question', titre: "Quelle est ta plus grande fierté ?" },
      { id: 'question-2', type: 'Question', titre: "Si tu pouvais voyager maintenant, où irais-tu ?" }
    ],
    quiz: [
      { id: 'quiz-1', type: 'Quiz', titre: "Quelle est la capitale de la France ?" },
      { id: 'quiz-2', type: 'Quiz', titre: "Combien de continents sur Terre ?" }
    ],
    devinette: [
      { id: 'devinette-1', type: 'Devinette', titre: "Quel animal a la meilleure mémoire ?" },
      { id: 'devinette-2', type: 'Devinette', titre: "Plus je grandis, moins je pèse. Qui suis‑je ?" }
    ],
    mystere: [
      { id: 'mystere-1', type: 'Mystère', titre: "Un indice caché dans la pièce..." }
    ],
    creatif: [
      { id: 'creatif-1', type: 'Créatif', titre: "Invente une histoire en 3 phrases." }
    ],
    defi: [
      { id: 'defi-1', type: 'Défi', titre: "Fais 10 sauts en 30 secondes." }
    ]
  };

  let selectedCategory = null;
  let selectedPlayer = null;
  let lastCard = null;

  // éléments
  const categoryBtns = document.querySelectorAll('.category-btn');
  const playerBtns = document.querySelectorAll('.player-btn');
  const drawBtn = document.getElementById('drawCard');
  const cardEl = document.querySelector('.card');
  const cardFront = document.querySelector('.card-front');
  const cardBack = document.querySelector('.card-back');
  const cardResult = document.querySelector('.card-result');

  // sélection de catégorie
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCategory = btn.dataset.category;
      drawBtn.disabled = !selectedCategory || !selectedPlayer;
    });
  });

  // sélection du joueur
  playerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPlayer = btn.dataset.player;
      drawBtn.disabled = !selectedCategory || !selectedPlayer;
    });
  });

  // fonction utilitaire : tirer une carte aléatoire selon catégorie
  function tirerCartePourCategorie(cat) {
    const pile = CARDS[cat] || [];
    if (pile.length === 0) return null;
    const idx = Math.floor(Math.random() * pile.length);
    // clone pour sécurité + timestamp id si besoin
    const base = Object.assign({}, pile[idx]);
    base.id = base.id || `${cat}-${Date.now()}`;
    return base;
  }

  // affichage de la carte dans .card-back et dataset
  function afficherCarte(carte) {
    if (!carte) return;
    lastCard = carte;
    if (cardEl) {
      cardEl.dataset.id = carte.id;
      cardEl.dataset.type = carte.type || selectedCategory || 'inconnu';
    }
    if (cardResult) cardResult.textContent = carte.titre;
    // bascule l'affichage : on montre back
    if (cardFront) cardFront.style.display = 'none';
    if (cardBack) cardBack.style.display = 'block';
    // rendre visible la zone succès si elle existe
    const success = document.querySelector('.success-section');
    if (success) success.style.display = 'flex';
  }

  // gestion du clic "Tirer la carte"
  drawBtn?.addEventListener('click', () => {
    if (!selectedCategory) return;
    const carte = tirerCartePourCategorie(selectedCategory);
    afficherCarte(carte);
  });

  // Handler "Faire plus tard" : ajoute au localStorage via CartesLib puis redirige
  document.getElementById('successNo')?.addEventListener('click', () => {
    if (!lastCard) {
      // capture minimun si lastCard absent
      const titre = cardResult?.textContent?.trim() || cardFront?.textContent?.trim() || `carte-${Date.now()}`;
      lastCard = {
        id: cardEl?.dataset?.id || `carte-${Date.now()}`,
        type: cardEl?.dataset?.type || selectedCategory || 'inconnu',
        titre,
        statut: 'attente'
      };
    } else {
      lastCard.statut = 'attente';
    }

    // utiliser la librairie si disponible
    if (window.CartesLib?.ajouterCarteInventaire) {
      window.CartesLib.ajouterCarteInventaire(lastCard);
    } else {
      // fallback basique
      const inv = JSON.parse(localStorage.getItem('inventaireCartes') || '[]');
      if (!inv.some(c => c.id === lastCard.id)) {
        inv.push(lastCard);
        localStorage.setItem('inventaireCartes', JSON.stringify(inv));
      }
    }

    // redirection vers inventaire ou mise à jour locale
    window.location.href = 'inventaire.html';
  });

  // Handler "Réussi" : marque terminee (ex. via CartesLib) et cache UI
  document.getElementById('successYes')?.addEventListener('click', () => {
    if (!lastCard) return;
    if (window.CartesLib?.mettreAJourStatutCarte) {
      window.CartesLib.mettreAJourStatutCarte(lastCard.id, 'terminee');
    }
    // Masquer la carte / revenir à front
    if (cardBack) cardBack.style.display = 'none';
    if (cardFront) {
      cardFront.style.display = 'block';
      cardFront.querySelector('p').textContent = 'Tire une carte pour commencer...';
    }
    const success = document.querySelector('.success-section');
    if (success) success.style.display = 'none';
    lastCard = null;
  });

  // initialisation UI : masquer back
  if (cardBack) cardBack.style.display = 'none';

  // --- Afficher le groupe sélectionné et ses membres actifs ---
  function renderSelectedGroup() {
    const nameEl = document.getElementById('currentGroupName');
    const membersEl = document.getElementById('activeMembers');
    if (!nameEl || !membersEl) return;
    const raw = localStorage.getItem('currentGroup');
    if (!raw) {
      nameEl.textContent = 'Aucun groupe sélectionné';
      membersEl.innerHTML = '';
      return;
    }
    try {
      const g = JSON.parse(raw);
      // amis.js stocke { id, name, members: [{ id, name, points, active }, ...], history ... }
      nameEl.textContent = g.name || g.nom || 'Groupe';
      const active = (g.members || []).filter(m => m.active);
      if (active.length === 0) {
        membersEl.innerHTML = '<li style="display:inline-block; margin-right:8px;">Aucun</li>';
      } else {
        membersEl.innerHTML = active.map(m => `<li style="display:inline-block; margin-right:8px;">${m.name}</li>`).join('');
      }
    } catch (e) {
      console.error('Erreur parse currentGroup', e);
      nameEl.textContent = 'Erreur lecture groupe';
      membersEl.innerHTML = '';
    }
  }

  // rendu initial et écoute des changements venant d'un autre onglet
  document.addEventListener('DOMContentLoaded', renderSelectedGroup);
  window.addEventListener('storage', (e) => {
    if (e.key === 'currentGroup') renderSelectedGroup();
  });
});
