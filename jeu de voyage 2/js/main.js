// scripts pour index.html : navigation simple + compteur inventaire
document.addEventListener('DOMContentLoaded', () => {
  const invCountEl = document.getElementById('invCount');
  const openInventoryBtn = document.getElementById('openInventory');
  const startLinks = document.querySelectorAll('#startGame, #ctaStart');
  const features = document.querySelectorAll('.feature');

  function getInventaire() {
    if (window.CartesLib && typeof window.CartesLib.getInventaire === 'function') {
      return window.CartesLib.getInventaire();
    }
    try {
      return JSON.parse(localStorage.getItem('inventaireCartes')) || [];
    } catch {
      return [];
    }
  }

  function updateInvCount() {
    const inventaire = getInventaire();
    invCountEl.textContent = inventaire.length || 0;
  }

  // ouvrir la page inventaire
  openInventoryBtn?.addEventListener('click', () => {
    window.location.href = 'inventaire.html';
  });

  // clic sur "Commencer le jeu" : on peut transmettre catégorie si besoin (ex: jeu.html?category=...)
  features.forEach(f => {
    f.addEventListener('click', () => {
      const cat = f.dataset.category;
      if (cat) {
        window.location.href = `jeu.html?category=${encodeURIComponent(cat)}`;
      } else {
        window.location.href = 'jeu.html';
      }
    });
    // accessible au clavier
    f.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        f.click();
      }
    });
  });

  // Si vous voulez un petit effet visuel au clic (optionnel)
  startLinks.forEach(a => a.addEventListener('click', () => {
    // exemple : on peut initialiser quelque chose dans CartesLib si nécessaire
    if (window.CartesLib?.clearInventaire && false) {
      // window.CartesLib.clearInventaire(); // décommenter si besoin
    }
  }));

  // initialisation
  updateInvCount();

  // mettre à jour le compteur quand l'utilisateur revient à la page (visibilitychange utile)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') updateInvCount();
  });
});

