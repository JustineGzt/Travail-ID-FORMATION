// profils.js — gestion des profils (localStorage + fallback data/profils.json)
document.addEventListener('DOMContentLoaded', async () => {
  const profilesContainer = document.getElementById('profilesContainer');
  const createUserBtn = document.getElementById('createUser');
  const newUserName = document.getElementById('newUserName');

  // util
  function generateId() {
    return 'user-' + Date.now();
  }

  // Charger depuis localStorage
  let profils = JSON.parse(localStorage.getItem('profils') || '[]');

  // Fusionner les profils par défaut (data/profils.json) si ils n'existent pas déjà
  try {
    const res = await fetch('data/profils.json');
    if (res.ok) {
      const defaults = await res.json();
      let merged = false;
        defaults.forEach(def => {
          const exists = profils.some(p => String(p.id) === String(def.id) || (p.nom && p.nom === def.nom));
          if (!exists) {
            // normalize avatar path to svg if not present
            if (!def.avatar) def.avatar = 'images/avatars/default.svg';
            profils.push(def);
            merged = true;
          }
        });
      if (merged) {
        localStorage.setItem('profils', JSON.stringify(profils));
      }
    }
  } catch (err) {
    // Silencieusement ignorer les erreurs de fetch (ex: page ouverte en file://)
    console.warn('Impossible de fusionner les profils par défaut :', err);
  }

  // Render
  function renderProfiles(list = profils) {
    profilesContainer.innerHTML = '';
    list.forEach(profile => {
      const li = document.createElement('li');
      li.classList.add('profile-card');
      // fallback SVG data URL used when the referenced image is missing (prevents 404 in console)
      const fallbackSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='100%25' height='100%25' fill='%23eeeeee'/><text x='50%25' y='50%25' font-size='18' text-anchor='middle' fill='%23666' dy='.35em'>?️</text></svg>";
      li.innerHTML = `
        <img src="${profile.avatar || 'images/avatars/default.svg'}" onerror="this.onerror=null;this.src=&quot;${fallbackSvg}&quot;" alt="${profile.nom}" width="50">
        <h3>${profile.nom}</h3>
        <p>Age: ${profile.informations?.age || '-'} | Genre: ${profile.informations?.genre || '-'}</p>
        <p>Description: ${profile.informations?.description || '-'}</p>
        <p>Niveau: ${profile.statistiques?.niveau || 0}, XP: ${profile.statistiques?.xp || 0}</p>
        <p>Points: ${profile.scoreTotal || 0}, Défis: ${profile.cartesTerminees?.length || 0}</p>
        <p>Amis: ${profile.amis?.length || 0}</p>
        <button class="add-friend" data-id="${profile.id}">Ajouter ami</button>
          <button class="view-profile" data-id="${profile.id}">Voir profil</button>
          <button class="delete-profile" data-id="${profile.id}">Suppr profil</button>
      `;
      profilesContainer.appendChild(li);
    });

    // events
    document.querySelectorAll('.add-friend').forEach(btn => {
      btn.addEventListener('click', () => addFriend(btn.dataset.id));
    });
    document.querySelectorAll('.view-profile').forEach(btn => {
      btn.addEventListener('click', () => viewProfile(btn.dataset.id));
    });
    // delete profile
    document.querySelectorAll('.delete-profile').forEach(btn => {
      btn.addEventListener('click', () => deleteProfile(btn.dataset.id));
    });
  }

  // Ajouter un ami (simulé) — on prend le premier profil comme "utilisateur courant"
  function addFriend(friendId) {
    if (!profils || profils.length === 0) return alert('Aucun profil disponible');
    const currentUser = profils[0];
    if (!currentUser.amis.includes(friendId)) {
      currentUser.amis.push(friendId);
      localStorage.setItem('profils', JSON.stringify(profils));
      // aussi ajouter dans le groupe "Mes amis" pour la page amis.html
      try {
        const friendProfile = profils.find(p => String(p.id) === String(friendId));
        const groups = JSON.parse(localStorage.getItem('amisGroups') || '[]');
        // trouver un groupe nommé 'Mes amis' créé automatiquement sinon en créer un
        let friendsGroup = groups.find(g => g.name === 'Mes amis');
        if (!friendsGroup) {
          friendsGroup = { id: 'friends-' + Date.now(), name: 'Mes amis', members: [], history: [] };
          groups.push(friendsGroup);
        }
        // ajouter membre si pas déjà présent (vérifier par id)
        const exists = (friendsGroup.members || []).some(m => String(m.id) === String(friendId));
        if (!exists) {
          friendsGroup.members = friendsGroup.members || [];
          friendsGroup.members.push({ id: friendProfile ? friendProfile.id : friendId, name: friendProfile ? friendProfile.nom : 'Inconnu', points: 0, active: true });
          localStorage.setItem('amisGroups', JSON.stringify(groups));
        }
      } catch (e) {
        console.warn('Erreur mise à jour groupes amis:', e);
      }
      alert('Ami ajouté !');
    } else {
      alert('Déjà ami');
    }
  }

  // Supprimer un profil (par id) et nettoyer les références
  function deleteProfile(id) {
    if (!confirm('Supprimer ce profil ? Cette action est irréversible.')) return;
    // retirer du tableau profils
    profils = profils.filter(p => String(p.id) !== String(id));
    // nettoyer les amis des autres profils
    profils.forEach(p => {
      if (Array.isArray(p.amis)) p.amis = p.amis.filter(a => String(a) !== String(id));
    });
    localStorage.setItem('profils', JSON.stringify(profils));

    // aussi retirer des groupes d'amis stockés (key: amisGroups)
    try {
      const groups = JSON.parse(localStorage.getItem('amisGroups') || '[]');
      let changed = false;
      groups.forEach(g => {
        if (Array.isArray(g.members)) {
          const before = g.members.length;
          g.members = g.members.filter(m => String(m.id) !== String(id));
          if (g.members.length !== before) changed = true;
        }
      });
      if (changed) localStorage.setItem('amisGroups', JSON.stringify(groups));
    } catch (e) { console.warn('Erreur nettoyage groupes amis:', e); }

    renderProfiles();
  }

  // Voir profil
  function viewProfile(id) {
    const profile = profils.find(p => String(p.id) === String(id));
    if (!profile) return;
    alert(`Profil de ${profile.nom}\nPoints: ${profile.scoreTotal || 0}\nDéfis: ${profile.cartesTerminees?.length || 0}\nAmis: ${profile.amis?.length || 0}`);
  }

  // Création d'un nouveau profil via l'input
  createUserBtn.addEventListener('click', () => {
    const name = newUserName.value.trim();
    if (!name) return alert('Nom obligatoire !');
    const newProfile = {
      id: generateId(),
      nom: name,
      avatar: 'images/avatars/default.svg',
      informations: { age: '-', genre: '-', description: '-', dateCreation: new Date().toISOString().split('T')[0] },
      statistiques: { niveau: 1, xp: 0, rang: 'Novice' },
      amis: [],
      cartesTerminees: [],
      messages: [],
      scoreTotal: 0
    };
    profils.push(newProfile);
    localStorage.setItem('profils', JSON.stringify(profils));
    newUserName.value = '';
    renderProfiles();
  });

  // initial render
  renderProfiles();

  // Importer les profils d'exemple à la demande (bouton)
  const importBtn = document.getElementById('importDefaults');
  if (importBtn) {
    importBtn.addEventListener('click', async () => {
      try {
        const res = await fetch('data/profils.json');
        if (!res.ok) return alert('Impossible de charger data/profils.json');
        const defaults = await res.json();
        let merged = false;
        defaults.forEach(def => {
          const exists = profils.some(p => String(p.id) === String(def.id) || (p.nom && p.nom === def.nom));
          if (!exists) {
            if (!def.avatar) def.avatar = 'images/avatars/default.svg';
            profils.push(def);
            merged = true;
          }
        });
        if (merged) {
          localStorage.setItem('profils', JSON.stringify(profils));
          renderProfiles();
          alert('Profils d\'exemple importés');
        } else {
          alert('Aucun profil d\'exemple à ajouter (déjà présent)');
        }
      } catch (err) {
        alert('Erreur lors de l\'import: ' + err.message);
      }
    });
  }

  // Recherche instantanée
  const searchInput = document.getElementById('searchProfiles');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) return renderProfiles();
      const filtered = profils.filter(p => (p.nom || '').toLowerCase().includes(q));
      renderProfiles(filtered);
    });
  }

  // Exporter profils (télécharger JSON)
  const exportBtn = document.getElementById('exportProfiles');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      try {
        const data = JSON.stringify(profils, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'profils-export.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } catch (err) {
        alert('Erreur export: ' + err.message);
      }
    });
  }

  // Importer profils depuis un fichier JSON (merge)
  const triggerImport = document.getElementById('triggerImportFile');
  const fileInput = document.getElementById('importFile');
  if (triggerImport && fileInput) {
    triggerImport.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const imported = JSON.parse(reader.result);
          if (!Array.isArray(imported)) return alert('Le fichier doit contenir un tableau JSON de profils.');
          let merged = false;
          imported.forEach(def => {
            const exists = profils.some(p => String(p.id) === String(def.id) || (p.nom && p.nom === def.nom));
            if (!exists) {
              if (!def.avatar) def.avatar = 'images/avatars/default.svg';
              profils.push(def);
              merged = true;
            }
          });
          if (merged) {
            localStorage.setItem('profils', JSON.stringify(profils));
            renderProfiles();
            alert('Profils importés avec succès.');
          } else {
            alert('Aucun profil à ajouter (les profils existent déjà).');
          }
        } catch (err) {
          alert('Fichier invalide: ' + err.message);
        }
      };
      reader.readAsText(f);
      // reset input
      fileInput.value = '';
    });
  }
});

