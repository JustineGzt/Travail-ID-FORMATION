(function (window) {
  'use strict';

  function safeParse(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      console.error('Erreur parse localStorage', e);
      return [];
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Erreur write localStorage', e);
    }
  }

  const KEY = 'inventaireCartes';

  function getInventaire() {
    return safeParse(KEY);
  }

  function saveInventaire(inv) {
    if (!Array.isArray(inv)) return;
    safeSet(KEY, inv);
  }

  function ajouterCarteInventaire(carte) {
    if (!carte || !carte.id) {
      console.warn('Carte invalide, id requis', carte);
      return;
    }
    const inventaire = getInventaire();
    if (!inventaire.some(c => c.id === carte.id)) {
      inventaire.push(carte);
      saveInventaire(inventaire);
    }
  }

  function mettreAJourStatutCarte(id, nouveauStatut) {
    if (!id) return;
    const inventaire = getInventaire();
    const idx = inventaire.findIndex(c => c.id === id);
    if (idx !== -1) {
      inventaire[idx].statut = nouveauStatut;
      saveInventaire(inventaire);
    }
  }

  function supprimerCarte(id) {
    if (!id) return;
    const inventaire = getInventaire().filter(c => c.id !== id);
    saveInventaire(inventaire);
  }

  function clearInventaire() {
    saveInventaire([]);
  }

  window.CartesLib = {
    getInventaire,
    ajouterCarteInventaire,
    mettreAJourStatutCarte,
    supprimerCarte,
    clearInventaire
  };
})(window);