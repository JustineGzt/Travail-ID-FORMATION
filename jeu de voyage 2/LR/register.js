// Sélection des éléments
const form = document.getElementById('registerForm');
const googleBtn = document.querySelector('.google');
const discordBtn = document.querySelector('.discord');
const phoneBtn = document.querySelector('.phone');
const guestBtn = document.querySelector('.guest');
const loginLink = document.querySelector('.message a');

// Fonction pour simuler création compte et redirection
function createAccountAndRedirect(username) {
    alert(`Compte créé pour ${username} !`);
    // Redirection vers index.html dans le dossier parent
    window.location.href = "../index.html";
}

// Formulaire classique
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if(!username || !email || !password || !confirmPassword){
        alert("Veuillez remplir tous les champs.");
        return;
    }

    if(password !== confirmPassword){
        alert("Les mots de passe ne correspondent pas !");
        return;
    }

    // Ici tu peux ajouter la logique réelle pour enregistrer l'utilisateur
    createAccountAndRedirect(username);
});

// Simulation des autres méthodes
googleBtn.addEventListener('click', () => {
    const pseudo = prompt("Pseudo pour Google ?");
    if(pseudo) createAccountAndRedirect(pseudo);
});

discordBtn.addEventListener('click', () => {
    const pseudo = prompt("Pseudo pour Discord ?");
    if(pseudo) createAccountAndRedirect(pseudo);
});

phoneBtn.addEventListener('click', () => {
    const phone = prompt("Numéro de téléphone ?");
    if(phone) createAccountAndRedirect("User_" + phone);
});

guestBtn.addEventListener('click', () => {
    const guestId = "Guest" + Math.floor(Math.random() * 10000);
    createAccountAndRedirect(guestId);
});

// Redirection vers login
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "login.html";
});
