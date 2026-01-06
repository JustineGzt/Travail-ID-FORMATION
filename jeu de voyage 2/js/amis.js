(function () {
  'use strict';

  const GROUPS_KEY = 'amisGroups';
  const CURRENT_KEY = 'currentGroup';
  const SESSIONS_KEY = 'groupSessions';
  const MAX_GROUPS = 5;

  // helpers de stockage local
  const load = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { console.error(e); } };

  // éléments DOM
  const createForm = document.getElementById('createGroupForm');
  const groupNameInput = document.getElementById('groupName');
  const groupsContainer = document.getElementById('groupsContainer');
  const noGroups = document.getElementById('noGroups');
  const groupLimitMsg = document.getElementById('groupLimitMsg');

  const groupDetail = document.getElementById('groupDetail');
  const detailTitle = document.getElementById('detailTitle');
  const addMemberForm = document.getElementById('addMemberForm');
  const memberNameInput = document.getElementById('memberName');
  const membersList = document.getElementById('membersList');
  const selectGroupBtn = document.getElementById('selectGroup');
  const deleteGroupBtn = document.getElementById('deleteGroup');
  const startSessionBtn = document.getElementById('startSession');
  const stopSessionBtn = document.getElementById('stopSession');
  const restartSessionBtn = document.getElementById('restartSession');
  const historyList = document.getElementById('historyList');

  const profileModal = document.getElementById('profileModal');
  const profileNameEl = document.getElementById('profileName');
  const profilePointsEl = document.getElementById('profilePoints');
  const incPointBtn = document.getElementById('incPoint');
  const decPointBtn = document.getElementById('decPoint');
  const toggleActiveBtn = document.getElementById('toggleActive');
  const markValidatedBtn = document.getElementById('markValidated');
  const closeProfileBtn = document.getElementById('closeProfile');

  // état en mémoire
  let groups = load(GROUPS_KEY);
  let sessions = load(SESSIONS_KEY);
  let current = null;
  let currentProfile = null;

  // utilitaires
  const uid = (p='id') => `${p}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
  const persistGroups = () => save(GROUPS_KEY, groups);
  const persistSessions = () => save(SESSIONS_KEY, sessions);
  const escapeHtml = (s='') => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);

  // rendu de la liste de groupes
  function renderGroups() {
    groupsContainer.innerHTML = '';
    if (!groups.length) { noGroups.style.display = 'block'; groupLimitMsg.style.display = 'none'; return; }
    noGroups.style.display = 'none';
    // Afficher le groupe "Mes amis" en premier si présent
    const ordered = groups.slice().sort((a,b) => {
      if (a.name === 'Mes amis' && b.name !== 'Mes amis') return -1;
      if (b.name === 'Mes amis' && a.name !== 'Mes amis') return 1;
      return 0;
    });
    ordered.forEach(g => {
      const div = document.createElement('div');
      div.className = 'group-card';
      div.innerHTML = `
        <strong>${escapeHtml(g.name)}</strong>
        <p class="meta">${(g.members?.length||0)} membre(s) • ${getGroupPoints(g)} pts</p>
        <div class="actions">
          <button class="btn small view" data-id="${g.id}">Voir</button>
          <button class="btn small del" data-id="${g.id}">Suppr</button>
        </div>
      `;
      groupsContainer.appendChild(div);
    });
    groupLimitMsg.style.display = groups.length >= MAX_GROUPS ? 'block' : 'none';
  }

  // ouvre la vue détail d'un groupe
  function openGroup(id) {
    const g = groups.find(x => x.id === id);
    if (!g) return;
    current = g;
    detailTitle.textContent = g.name;
    renderMembers();
    renderHistory();
    renderSessionControls();
    groupDetail.style.display = 'block';
  }

  // affiche les membres du groupe courant
  function renderMembers() {
    membersList.innerHTML = '';
    (current.members || []).forEach((m, idx) => {
      const li = document.createElement('li');
      li.dataset.idx = idx;
      li.innerHTML = `
        <span class="member-name">${escapeHtml(m.name)}</span>
        <span class="member-points">(${m.points||0} pts)</span>
        <span class="member-active" style="margin-left:8px;color:${m.active? 'green':'#888'}">${m.active? '● actif':'○ inactif'}</span>
        <div style="float:right">
          <button class="btn tiny profile" data-mid="${m.id}">Profil</button>
          <button class="btn tiny remove" data-idx="${idx}">Suppr</button>
        </div>
      `;
      membersList.appendChild(li);
    });

  }

  // affiche l'historique du groupe
  function renderHistory() {
    historyList.innerHTML = '';
    (current.history || []).slice(0,50).forEach(h => {
      const li = document.createElement('li');
      li.textContent = `[${new Date(h.ts).toLocaleString()}] ${h.text}`;
      historyList.appendChild(li);
    });
    if (!current.history || current.history.length === 0) historyList.innerHTML = '<li>Aucun historique.</li>';
  }

  // met à jour l'affichage des contrôles de session
  function renderSessionControls() {
    const activeSess = sessions.find(s => s.groupId === current.id && s.active);
    startSessionBtn.style.display = activeSess ? 'none' : 'inline-block';
    stopSessionBtn.style.display = activeSess ? 'inline-block' : 'none';
    const ended = sessions.find(s => s.groupId === current.id && !s.active);
    restartSessionBtn.style.display = (!activeSess && ended) ? 'inline-block' : 'none';
  }

  // calcule le total de points du groupe
  function getGroupPoints(g) {
    return (g.members || []).reduce((s, m) => s + (m.points || 0), 0);
  }

  // opérations groupes/membres
  function addGroup(name) {
    if (groups.length >= MAX_GROUPS) return alert('Limite de groupes atteinte.');
    const id = uid('group');

    // récupère le nom local (si présent) ou 'kiba' par défaut
    const localName = (function(){
      try { return localStorage.getItem('playerName') || 'kiba'; } catch { return 'kiba'; }
    })();

    // crée le membre créateur automatiquement (actif)
    const creatorMember = {
      id: uid('m'),
      name: String(localName).trim() || 'kiba',
      points: 0,
      active: true
    };

    groups.push({ id, name: name.trim(), members: [creatorMember], history: [] });
    persistGroups();
    renderGroups();
    openGroup(id);
  }

  function addMember(name) {
    if (!current) return;
    const mid = uid('m');
    current.members = current.members || [];
    current.members.push({ id: mid, name: name.trim(), points: 0, active: true });
    persistGroups();
    openGroup(current.id);
  }

  function removeMemberByIndex(idx) {
    if (!current) return;
    current.members.splice(idx,1);
    persistGroups();
    openGroup(current.id);
  }

  function deleteCurrentGroup() {
    if (!current) return;
    if (!confirm('Supprimer le groupe ?')) return;
    groups = groups.filter(g => g.id !== current.id);
    persistGroups();
    current = null;
    groupDetail.style.display = 'none';
    renderGroups();
  }

  // modal profil : ouvrir/fermer
  function openProfile(mid) {
    if (!current) return;
    const m = current.members.find(x => x.id === mid);
    if (!m) return;
    currentProfile = m;
    profileNameEl.textContent = m.name;
    profilePointsEl.textContent = m.points || 0;
    profileModal.style.display = 'block';
  }
  function closeProfile() { profileModal.style.display = 'none'; currentProfile = null; }

  function saveProfileChange() {
    persistGroups();
    renderMembers();
    renderHistory();
    renderGroups();
  }

  // gestion des événements (formulaires et clics délégués)
  createForm?.addEventListener('submit', e => { e.preventDefault(); if (groupNameInput.value) addGroup(groupNameInput.value); groupNameInput.value = ''; });
  addMemberForm?.addEventListener('submit', e => { e.preventDefault(); if (memberNameInput.value && current) addMember(memberNameInput.value); memberNameInput.value = ''; });

  groupsContainer?.addEventListener('click', e => {
    const v = e.target.closest('.view');
    if (v) return openGroup(v.dataset.id);
    const d = e.target.closest('.del');
    if (d) {
      if (!confirm('Supprimer ce groupe ?')) return;
      groups = groups.filter(g => g.id !== d.dataset.id);
      persistGroups();
      if (current?.id === d.dataset.id) { current = null; groupDetail.style.display = 'none'; }
      renderGroups();
    }
  });

  // délégation sur la liste de membres pour profil / suppression
  membersList?.addEventListener('click', e => {
    const rem = e.target.closest('.remove');
    if (rem) return removeMemberByIndex(Number(rem.dataset.idx));
    const prof = e.target.closest('.profile');
    if (prof) return openProfile(prof.dataset.mid);
  });

  // actions du modal profil : points / actif / validation
  incPointBtn?.addEventListener('click', () => {
    if (!currentProfile) return;
    currentProfile.points = (currentProfile.points || 0) + 1;
    (current.history = current.history || []).unshift({ ts: Date.now(), text: `${currentProfile.name} +1 pt` });
    saveProfileChange();
    openProfile(currentProfile.id);
  });
  decPointBtn?.addEventListener('click', () => {
    if (!currentProfile) return;
    currentProfile.points = Math.max(0, (currentProfile.points || 0) - 1);
    (current.history = current.history || []).unshift({ ts: Date.now(), text: `${currentProfile.name} -1 pt` });
    saveProfileChange();
    openProfile(currentProfile.id);
  });
  toggleActiveBtn?.addEventListener('click', () => {
    if (!currentProfile) return;
    currentProfile.active = !currentProfile.active;
    (current.history = current.history || []).unshift({ ts: Date.now(), text: `${currentProfile.name} est ${currentProfile.active ? 'actif' : 'inactif'}` });
    saveProfileChange();
    openProfile(currentProfile.id);
  });
  markValidatedBtn?.addEventListener('click', () => {
    if (!currentProfile) return;
    (current.history = current.history || []).unshift({ ts: Date.now(), text: `${currentProfile.name} a validé une catégorie` });
    saveProfileChange();
    openProfile(currentProfile.id);
  });
  closeProfileBtn?.addEventListener('click', closeProfile);
  profileModal?.addEventListener('click', (e) => { if (e.target === profileModal) closeProfile(); });

  // contrôle des sessions (démarrer / arrêter / relancer)
  function startSession() {
    if (!current) return alert('Sélectionne un groupe d\'abord.');
    const activeMembers = (current.members || []).filter(m => m.active);
    if (!activeMembers.length) return alert('Aucun membre actif. Demande aux joueurs de se rendre actifs depuis leur profil.');
    const sid = uid('sess');
    const s = { id: sid, groupId: current.id, startedAt: Date.now(), active: true, participants: activeMembers.map(m => m.id) };
    sessions.push(s);
    persistSessions();
    (current.history = current.history || []).unshift({ ts: Date.now(), text: `Partie lancée (${activeMembers.length} joueur(s))` });
    persistGroups();
    renderSessionControls();
    renderHistory();
  }
  function stopSession() {
    const s = sessions.find(x => x.groupId === current.id && x.active);
    if (!s) return alert('Aucune session active.');
    s.active = false; s.endedAt = Date.now();
    persistSessions();
    (current.history = current.history || []).unshift({ ts: Date.now(), text: 'Partie arrêtée' });
    persistGroups();
    renderSessionControls();
    renderHistory();
  }
  function restartSession() {
    const activeMembers = (current.members || []).filter(m => m.active);
    if (!activeMembers.length) return alert('Aucun membre actif pour relancer.');
    startSession();
  }

  startSessionBtn?.addEventListener('click', startSession);
  stopSessionBtn?.addEventListener('click', stopSession);
  restartSessionBtn?.addEventListener('click', restartSession);
  deleteGroupBtn?.addEventListener('click', deleteCurrentGroup);
  selectGroupBtn?.addEventListener('click', () => {
    // sélectionne le groupe, enregistre la session active si elle existe puis redirige vers la page de jeu
    if (!current) return alert('Aucun groupe sélectionné.');
    try {
      localStorage.setItem(CURRENT_KEY, JSON.stringify(current));
      // si une session active existe pour ce groupe, on la mémorise pour la page de jeu
      const active = sessions.find(s => s.groupId === current.id && s.active);
      if (active) {
        localStorage.setItem('currentSession', JSON.stringify(active));
      } else {
        localStorage.removeItem('currentSession');
      }
      // redirection vers la page de jeu
      window.location.href = 'jeu.html';
    } catch (e) {
      console.error(e);
      alert('Erreur stockage.');
    }
  });

  // initialisation
  renderGroups();
  try {
    const last = JSON.parse(localStorage.getItem(CURRENT_KEY));
    if (last && last.id) {
      const found = groups.find(g => g.id === last.id);
      if (found) openGroup(found.id);
    }
  } catch {}

  // S'assurer que le groupe "Mes amis" existe et l'ouvrir par défaut si aucun groupe courant
  (function ensureAndOpenFriends() {
    try {
      let friends = groups.find(g => g.name === 'Mes amis');
      if (!friends) {
        friends = { id: 'friends-' + Date.now(), name: 'Mes amis', members: [], history: [] };
        groups.unshift(friends);
        persistGroups();
      }
      // Si aucun groupe ouvert, ouvrir 'Mes amis'
      if (!current) openGroup(friends.id);
    } catch (e) {
      console.warn('Erreur lors de l\'initialisation du groupe Mes amis:', e);
    }
  })();

  // fonction exposée pour d'autres scripts (ex : jeu) qui veulent ajouter une validation
  window.AmisLib = { pushExternalValidation: (groupId, memberId, text) => {
    const g = groups.find(x => x.id === groupId);
    if (!g) return;
    (g.history = g.history || []).unshift({ ts: Date.now(), text });
    persistGroups();
    if (current?.id === groupId) renderHistory();
  } };

})();


function importProfiles(profiles) {
  // récupère ou crée le groupe 'Mes amis'
  let friendsGroup = groups.find(g => g.name === 'Mes amis');
  if (!friendsGroup) {
    friendsGroup = { id: uid('group'), name: 'Mes amis', members: [], history: [] };
    groups.unshift(friendsGroup);
  }

  profiles.forEach(profile => {
    // évite les doublons
    if (!friendsGroup.members.some(m => m.name === profile.nom)) {
      friendsGroup.members.push({
        id: profile.id || uid('m'),
        name: profile.nom,
        points: profile.statistiques?.xp || 0,
        active: profile.active ?? true
      });
    }
  });

  persistGroups();

  // réaffiche le groupe si c’est celui ouvert
  if (current?.id === friendsGroup.id) openGroup(current.id);
}
