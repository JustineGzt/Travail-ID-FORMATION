const mots = [
  "MANGUE", "TOMATE", "PYTHON", "SOLEIL", "ORDINATEUR", "PLANETE",
  "ELEPHANT", "CHOCOLAT", "ASTERISQUE", "LUNE", "VOITURE", "BICYCLETTE",
  "MONTAGNE", "RIVIERE", "ARBRE", "FLEUR", "CHAISE", "TABLE", "ORDINATEUR",
  "PROGRAMMATION", "JAVASCRIPT", "BOUTEILLE", "LIVRE", "MAGNET", "PENDULE"
];
    let motSecret = mots[Math.floor(Math.random() * mots.length)];
    let motAffiche = Array(motSecret.length).fill("_");
    let erreurs = 0;
    const maxErreurs = 6;

    document.getElementById("motAffiche").textContent = motAffiche.join(" ");

    // Crée les boutons A-Z
    const lettresDiv = document.getElementById("lettres");
    for (let i = 65; i <= 90; i++) {
      const lettre = String.fromCharCode(i);
      const btn = document.createElement("button");
      btn.textContent = lettre;
      btn.onclick = () => verifierLettre(lettre, btn);
      lettresDiv.appendChild(btn);
    }

    function verifierLettre(lettre, bouton) {
      bouton.disabled = true;
      let trouve = false;

      for (let i = 0; i < motSecret.length; i++) {
        if (motSecret[i] === lettre) {
          motAffiche[i] = lettre;
          trouve = true;
        }
      }

      if (!trouve) {
        erreurs++;
        document.getElementById("erreurs").textContent = erreurs;
      }

      document.getElementById("motAffiche").textContent = motAffiche.join(" ");

      // Vérifie si le joueur a gagné ou perdu
      if (!motAffiche.includes("_")) {
        document.getElementById("resultat").textContent = "🎉 Gagné ! Le mot était " + motSecret;
        desactiverTous();
      } else if (erreurs >= maxErreurs) {
        document.getElementById("resultat").textContent = "💀 Perdu ! Le mot était " + motSecret;
        desactiverTous();
      }
    }

    function desactiverTous() {
      document.querySelectorAll("#lettres button").forEach(b => b.disabled = true);
    }


    function nouveauMot() {
      // Choisir un nouveau mot
      motSecret = mots[Math.floor(Math.random() * mots.length)];
      
      // Réinitialiser le mot affiché
      motAffiche = Array(motSecret.length).fill("_");
      document.getElementById("motAffiche").textContent = motAffiche.join(" ");
      
      // Réinitialiser erreurs et résultat
      erreurs = 0;
      document.getElementById("erreurs").textContent = erreurs;
      document.getElementById("resultat").textContent = "";
      
      // Réactiver tous les boutons
      document.querySelectorAll("#lettres button").forEach(b => b.disabled = false);
    }

    // Ajouter l'événement au bouton
    document.getElementById("motSuivant").addEventListener("click", nouveauMot);
