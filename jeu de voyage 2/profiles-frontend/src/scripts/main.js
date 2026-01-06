// This file contains the JavaScript code for the application. 
// It may include functionality related to the profiles page.

document.addEventListener('DOMContentLoaded', () => {
    // Initialize profile functionality
    initProfilePage();
});

function initProfilePage() {
    // Example: Fetch and display user profile data
    fetchProfileData()
        .then(data => {
            displayProfileData(data);
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
        });
}

function fetchProfileData() {
    // Simulate fetching profile data from an API
    return new Promise((resolve, reject) => {
        const mockData = {
            name: 'John Doe',
            age: 30,
            bio: 'Web developer and tech enthusiast.'
        };
        setTimeout(() => {
            resolve(mockData);
        }, 1000);
    });
}

function displayProfileData(data) {
    const profileContainer = document.getElementById('profile-container');
    profileContainer.innerHTML = `
        <h1>${data.name}</h1>
        <p>Age: ${data.age}</p>
        <p>Bio: ${data.bio}</p>
    `;
}

// Example: Profiles data
const profiles = [
    { id: 'p1', name: 'Alice', points: 12, active: true },
    { id: 'p2', name: 'Bob', points: 5, active: false },
    { id: 'p3', name: 'Chloé', points: 8, active: true }
];

const container = document.getElementById('profiles');
profiles.forEach(p => {
    const card = document.createElement('article');
    card.className = 'profile-card';
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p class="profile-meta">Points: <strong>${p.points}</strong> · Statut: <em>${p.active ? 'Actif' : 'Inactif'}</em></p>
      <div class="actions">
        <button class="btn view" data-id="${p.id}">Voir</button>
      </div>
    `;
    container.appendChild(card);
});

container.addEventListener('click', (e) => {
    const btn = e.target.closest('.view');
    if (!btn) return;
    const id = btn.dataset.id;
    alert('Ouvrir profil: ' + id);
});