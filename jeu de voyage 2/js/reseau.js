// ========================== VARIABLES ==========================
let profils = JSON.parse(localStorage.getItem('profils') || '[]');
let groupes = JSON.parse(localStorage.getItem('groupes') || '[]');
let chatMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');

let currentUser = null;

// ========================== ELEMENTS ==========================
const loginName = document.getElementById('loginName');
const loginBtn = document.getElementById('loginBtn');
const profileInfo = document.getElementById('profileInfo');
const profileName = document.getElementById('profileName');
const profileScore = document.getElementById('profileScore');
const profileDone = document.getElementById('profileDone');

const profilesContainer = document.getElementById('profilesContainer');

const chatBox = document.getElementById('chatBox');
const chatMessage = document.getElementById('chatMessage');
const sendChat = document.getElementById('sendChat');

const newGroupName = document.getElementById('newGroupName');
const createGroup = document.getElementById('createGroup');
const groupList = document.getElementById('groupList');

// ========================== PROFIL ==========================
function loginUser() {
  const name = loginName.value.trim();
  if (!name) return alert("Nom obligatoire !");
  
  let user = profils.find(u => u.nom === name);
  if (!user) {
    user = {
      id: 'user-' + Date.now(),
      nom: name,
      scoreTotal: 0,
      cartesTerminees: [],
      amis: [],
      messages: []
    };
    profils.push(user);
    saveProfils();
  }
  
  currentUser = user;
  loginName.value = '';
  renderCurrentUser();
  renderProfiles();
}

function renderCurrentUser() {
  if (!currentUser) return;
  profileInfo.style.display = 'block';
  profileName.textContent = currentUser.nom;
  profileScore.textContent = currentUser.scoreTotal;
  profileDone.textContent = currentUser.cartesTerminees.length;
}

// ========================== PROFILS ==========================
function renderProfiles() {
  profilesContainer.innerHTML = '';
  profils.forEach(profile => {
    if (!currentUser || profile.id === currentUser.id) return; // pas afficher soi-même
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${profile.nom}</strong> - Points: ${profile.scoreTotal} - Cartes: ${profile.cartesTerminees.length}
      <button class="add-friend" data-id="${profile.id}">Ajouter ami</button>
      <button class="view-profile" data-id="${profile.id}">Voir profil</button>
    `;
    profilesContainer.appendChild(li);
  });
  document.querySelectorAll('.add-friend').forEach(btn => btn.addEventListener('click', () => {
    const friendId = btn.dataset.id;
    addFriend(friendId);
  }));
  document.querySelectorAll('.view-profile').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    viewProfile(id);
  }));
}

function addFriend(friendId) {
  if (!currentUser) return alert("Connecte-toi d'abord !");
  if (!currentUser.amis.includes(friendId)) {
    currentUser.amis.push(friendId);
    saveProfils();
    alert("Ami ajouté !");
  } else {
    alert("Déjà ami !");
  }
}

function viewProfile(id) {
  const profile = profils.find(p => p.id === id);
  if (!profile) return alert("Profil introuvable !");
  alert(`Nom : ${profile.nom}\nPoints : ${profile.scoreTotal}\nCartes terminées : ${profile.cartesTerminees.length}\nAmis : ${profile.amis.length}`);
}

function saveProfils() {
  localStorage.setItem('profils', JSON.stringify(profils));
}

// ========================== CHAT ==========================
function renderChat() {
  chatBox.innerHTML = chatMessages.map(m => `<p><strong>${m.user}:</strong> ${m.message}</p>`).join('');
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendChat.addEventListener('click', () => {
  if (!currentUser) return alert("Connecte-toi pour envoyer un message !");
  const msg = chatMessage.value.trim();
  if (!msg) return;
  chatMessages.push({ user: currentUser.nom, message: msg, timestamp: Date.now() });
  localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  chatMessage.value = '';
  renderChat();
});

// ========================== GROUPES ==========================
function renderGroups() {
  groupList.innerHTML = '';
  groupes.forEach(g => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${g.nom}</strong> - Membres: ${g.membres.length} 
      <button class="join-group" data-id="${g.id}">Rejoindre</button>`;
    groupList.appendChild(li);
  });
  document.querySelectorAll('.join-group').forEach(btn => {
    btn.addEventListener('click', () => {
      joinGroup(btn.dataset.id);
    });
  });
}

createGroup.addEventListener('click', () => {
  if (!currentUser) return alert("Connecte-toi pour créer un groupe !");
  const name = newGroupName.value.trim();
  if (!name) return;
  const newGroup = { id: 'group-' + Date.now(), nom: name, membres: [currentUser.id] };
  groupes.push(newGroup);
  localStorage.setItem('groupes', JSON.stringify(groupes));
  newGroupName.value = '';
  renderGroups();
});

function joinGroup(groupId) {
  const group = groupes.find(g => g.id === groupId);
  if (!group) return;
  if (!group.membres.includes(currentUser.id)) {
    group.membres.push(currentUser.id);
    localStorage.setItem('groupes', JSON.stringify(groupes));
    alert(`Tu as rejoint le groupe ${group.nom}`);
  } else {
    alert("Déjà membre");
  }
}

// ========================== INIT ==========================
loginBtn.addEventListener('click', loginUser);
renderProfiles();
renderChat();
renderGroups();
