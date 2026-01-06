const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if(!username || !password){
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Ici tu peux ajouter la logique de connexion : vérifier la base d'utilisateurs
    alert(`Connexion réussie pour ${username} !`);
    loginForm.reset();

    // Redirection vers le profil ou jeu :
    // window.location.href = "profile.html";
});
