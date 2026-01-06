(function () {
  'use strict';

  // --- clés localStorage
  const CURRENT_KEY = 'currentGroup';
  const CURRENT_SESSION_KEY = 'currentSession';

  // --- DOM (éléments de l'UI du jeu)
  const playerContainer = document.getElementById('playerChoiceContainer');
  const scoreboardContainer = document.getElementById('scoreboardContainer');
  const nameEl = document.getElementById('currentGroupName');
  const membersEl = document.getElementById('activeMembers');

  // éléments de gestion des cartes (peuvent être absents selon ton HTML)
  const drawBtn = document.getElementById('drawBtn');
  const successNo = document.getElementById('successNo');
  const successYes = document.getElementById('successYes');
  const cardBack = document.getElementById('cardBack');
  const cardFront = document.getElementById('cardFront');
  const successBtns = document.getElementById('successBtns');

  // nom local fixé (kiba)
  if (!localStorage.getItem('playerName')) localStorage.setItem('playerName', 'kiba');

  function escapeHtml(s = '') { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]); }
  function getLocalPlayerName() { return localStorage.getItem('playerName') || 'kiba'; }

  // --- récupération des joueurs actifs du groupe (priorité session)
  function getActivePlayersFromGroup() {
    const raw = localStorage.getItem(CURRENT_KEY);
    if (!raw) return [getLocalPlayerName()];
    try {
      const g = JSON.parse(raw);
      let active = [];
      const sessRaw = localStorage.getItem(CURRENT_SESSION_KEY);
      if (sessRaw) {
        try {
          const sess = JSON.parse(sessRaw);
          if (Array.isArray(sess.participants) && Array.isArray(g.members)) {
            active = sess.participants.map(id => {
              const m = g.members.find(x => x.id === id);
              return m ? m.name : id;
            }).filter(Boolean);
          }
        } catch (_) { /* ignore */ }
      }
      if (!active.length && Array.isArray(g.members)) active = g.members.filter(m => m.active).map(m => m.name);
      const local = getLocalPlayerName();
      const filtered = active.filter(n => n !== local);
      return [local, ...filtered];
    } catch (e) {
      console.error('Erreur parse currentGroup', e);
      return [getLocalPlayerName()];
    }
  }

  // --- rendu des joueurs et scoreboard
  function renderPlayerList(list) {
    if (!playerContainer) return;
    playerContainer.innerHTML = list.map(n =>
      `<button class="player-btn" type="button" data-name="${escapeHtml(n)}">${escapeHtml(n)}</button>`
    ).join(' ');
    updateSelectedPlayerUI();
  }

  // stocke le joueur courant dans sessionStorage (ne remplace pas playerName)
  function setCurrentPlayer(name) {
    if (!name) return;
    sessionStorage.setItem('currentPlayerTurn', name);
    updateSelectedPlayerUI();
  }

  function getCurrentPlayer() {
    return sessionStorage.getItem('currentPlayerTurn') || null;
  }

  function updateSelectedPlayerUI() {
    const sel = getCurrentPlayer();
    document.querySelectorAll('.player-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.name === sel);
    });
  }

  function renderScoreboard(list) {
    if (!scoreboardContainer) return;
    const parts = list.map((n, i) => {
      const idSafe = `score-${i}`;
      const existing = document.getElementById(idSafe);
      const val = existing ? existing.textContent : '0';
      return `<span class="score-item"><strong>${escapeHtml(n)}</strong> : <span id="${idSafe}">${val}</span></span>`;
    });
    scoreboardContainer.innerHTML = `<p>${parts.join(' &nbsp;|&nbsp; ')}</p>`;
  }

  function renderHeaderAndMembers(players) {
    if (nameEl) {
      const raw = localStorage.getItem(CURRENT_KEY);
      try { nameEl.textContent = raw ? JSON.parse(raw).name || 'Groupe' : 'Aucun groupe sélectionné'; } catch { nameEl.textContent = 'Groupe'; }
    }
    if (membersEl) {
      const others = players.slice(1);
      membersEl.innerHTML = others.length ? others.map(n => `<li style="display:inline-block;margin-right:8px;">${escapeHtml(n)}</li>`).join('') : '<li style="display:inline-block;margin-right:8px;color:#aaa">Aucun</li>';
    }
  }

  function renderAll() {
    const players = getActivePlayersFromGroup();
    renderHeaderAndMembers(players);
    renderPlayerList(players);
    renderScoreboard(players);
  }

  document.addEventListener('DOMContentLoaded', renderAll);
  window.addEventListener('storage', (e) => {
    if (e.key === CURRENT_KEY || e.key === CURRENT_SESSION_KEY || e.key === 'playerName') renderAll();
  });

  // --- logique de tir / gestion de carte
  // selectedCategory peut être défini ailleurs ; on utilise window.selectedCategory si présent
  let selectedCategory = window.selectedCategory || null;
  let lastCard = window.lastCard || null;

  // fonction d'affichage de carte fallback si ta page n'en a pas
  function afficherCarteFallback(carteObj) {
    if (!cardBack || !cardFront) return;
    // affichage minimal : montrer le titre au verso
    cardBack.style.display = 'block';
    cardFront.style.display = 'none';
    const titleEl = cardBack.querySelector('.card-title') || cardBack.querySelector('p');
    if (titleEl) titleEl.textContent = carteObj.titre || carteObj.type || 'Carte';
    if (successBtns) successBtns.style.display = 'flex';
  }

  drawBtn?.addEventListener('click', () => {
    // récupère la catégorie courante au moment du tir
    selectedCategory = window.selectedCategory || selectedCategory;
    if (!selectedCategory) return alert('Sélectionne une catégorie d\'abord.');
    const tirer = window.tirerCartePourCategorie;
    const carte = typeof tirer === 'function' ? tirer(selectedCategory) : null;
    if (!carte) return alert('Aucune carte disponible pour cette catégorie.');

    // construire l'objet carte et stocker
    const carteObj = {
      id: carte.id || `c-${Date.now()}`,
      type: selectedCategory,
      titre: carte.titre || carte.name || 'Carte',
      statut: "attente",
      missionRevelee: false
    };

    if (window.CartesLib && typeof window.CartesLib.ajouterCarteInventaire === 'function') {
      window.CartesLib.ajouterCarteInventaire(carteObj);
    }

    // affichage
    if (typeof window.afficherCarte === 'function') {
      window.afficherCarte(carteObj);
    } else {
      afficherCarteFallback(carteObj);
    }

    lastCard = carteObj;
    window.lastCard = lastCard;
  });

  successNo?.addEventListener('click', () => {
    if (!lastCard) return;
    lastCard.statut = "attente";
    if (window.CartesLib && typeof window.CartesLib.mettreAJourStatutCarte === 'function') {
      window.CartesLib.mettreAJourStatCarte(lastCard.id, "attente");
    }
    // renvoi vers l'inventaire
    window.location.href = 'cartes.html';
  });

  successYes?.addEventListener('click', () => {
    if (!lastCard) return;
    lastCard.statut = "terminee";
    lastCard.missionRevelee = true;
    if (window.CartesLib && typeof window.CartesLib.mettreAJourStatCarte === 'function') {
      window.CartesLib.mettreAJourStatCarte(lastCard.id, "terminee", true);
    }
    if (cardBack) cardBack.style.display = 'none';
    if (cardFront) {
      cardFront.style.display = 'block';
      const p = cardFront.querySelector('p');
      if (p) p.textContent = 'Tire une carte pour commencer...';
    }
    if (successBtns) successBtns.style.display = 'none';
    lastCard = null;
    window.lastCard = null;
  });

  // --- utilitaire d'action "Sélectionner pour jouer" côté amis.js attendu :
  // amis.js met currentGroup et currentSession dans localStorage puis redirige vers jeu.html.
  // ici on lit ces données via getActivePlayersFromGroup() et renderAll().

  // voir le groupe courant
  const g = JSON.parse(localStorage.getItem('currentGroup') || '{}');
  console.log(g);

  // lister les membres et leurs ids
  console.log(g.members || []);

  // chercher Kiba dans les membres
  (g.members || []).find(m => m.name === 'Kiba');

  // Fin du module
})();