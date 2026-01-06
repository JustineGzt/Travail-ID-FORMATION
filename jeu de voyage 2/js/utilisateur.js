document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------------------------------
     ACCORDIONS : initialisation (gère tous les .accordion)
  ------------------------------------------------------ */
  function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(acc => {
      const header = acc.querySelector('.accordion-header');
      const content = acc.querySelector('.accordion-content');
      const toggle = acc.querySelector('.toggle');

      // Défensif : s'assurer que les éléments existent
      if (!header || !content || !toggle) return;

      // Setup ARIA et styles initiaux pour animation
      header.setAttribute('role', 'button');
      header.setAttribute('aria-expanded', acc.classList.contains('open') ? 'true' : 'false');
      content.setAttribute('role', 'region');
      content.style.overflow = 'hidden';
      content.style.maxHeight = acc.classList.contains('open') ? content.scrollHeight + 'px' : '0px';
      content.style.transition = 'max-height 300ms ease';

      // Mettre le bon symbole au chargement
      toggle.textContent = acc.classList.contains('open') ? '−' : '+';

      // Clic
      header.addEventListener('click', () => {
        const isOpen = acc.classList.toggle('open');

        // Mettre à jour aria + toggle
        header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.textContent = isOpen ? '−' : '+';

        // Animation slide : régler maxHeight
        if (isOpen) {
          // ouvrir : définir maxHeight à scrollHeight (avec petit timeout pour forcer le recalcul si nécessaire)
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          // fermer : passer à 0
          content.style.maxHeight = '0px';
        }
      });

      // Optionnel : permettre ouverture/fermeture via Enter/Espace quand header a le focus
      header.tabIndex = 0;
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    });
  }

  /* ------------------------------------------------------
     UTIL : ASSURER LE BLOC AVATAR
  ------------------------------------------------------ */
  function ensureAvatarBlock() {
    let avatarContainer = document.querySelector(".avatar");
    let existingImg = document.querySelector(".avatar img") ||
                      document.querySelector("header img") ||
                      document.querySelector("img");

    // Si pas de container avatar → on le crée
    if (!avatarContainer) {
      avatarContainer = document.createElement("div");
      avatarContainer.className = "avatar card";

      const header = document.querySelector("header") || document.body;
      header.insertBefore(avatarContainer, header.firstChild);
    }

    // Si pas d’image → créer une par défaut
    if (!existingImg) {
      existingImg = document.createElement("img");
      existingImg.src = "./images/avatars/pexels-kadri.jpg";
    }

    // Mettre l’image dans le container si nécessaire
    if (!avatarContainer.contains(existingImg)) {
      avatarContainer.innerHTML = "";
      avatarContainer.appendChild(existingImg);
    }

    // Style défensif
    Object.assign(existingImg.style, {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover"
    });

    return existingImg;
  }

  /* ------------------------------------------------------
     ASSURER LES PARAMÈTRES
  ------------------------------------------------------ */
  function createParamsSection() {
    if (document.querySelector(".Parametres")) return document.querySelector(".Parametres");

    const section = document.createElement("div");
    section.className = "Parametres card";

    const title = document.createElement("h3");
    title.textContent = "Paramètres du profil";
    section.appendChild(title);

    const header = document.querySelector("header") || document.body;
    header.appendChild(section);
    return section;
  }

  function ensureExtraSettings() {
    const paramsSection = document.querySelector(".Parametres") || createParamsSection();

    /** helper : créer un champ select **/
    function createSelect(id, labelText, options = []) {
      if (document.getElementById(id)) return;

      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.textContent = labelText;

      const select = document.createElement("select");
      select.id = id;

      options.forEach(o => {
        const opt = document.createElement("option");
        opt.value = o.value;
        opt.textContent = o.label;
        select.appendChild(opt);
      });

      paramsSection.appendChild(label);
      paramsSection.appendChild(select);
      paramsSection.appendChild(document.createElement("br"));
    }

    /** helper : checkbox **/
    function createCheckbox(id, labelText) {
      if (document.getElementById(id)) return;

      const wrapper = document.createElement("div");
      wrapper.style.margin = "8px 0";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = id;

      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.textContent = " " + labelText;

      wrapper.appendChild(input);
      wrapper.appendChild(label);
      paramsSection.appendChild(wrapper);
    }

    /* ---------- PARAMÈTRES SUPPLÉMENTAIRES ---------- */

    createSelect("privacySetting", "Confidentialité :", [
      { value: "public", label: "Public" },
      { value: "friends", label: "Amis seulement" },
      { value: "private", label: "Privé" }
    ]);

    createSelect("notificationSetting", "Notifications :", [
      { value: "all", label: "Tout" },
      { value: "mentions", label: "Mentions seulement" },
      { value: "none", label: "Aucune" }
    ]);

    createSelect("themeSetting", "Thème de l’application :", [
      { value: "light", label: "Clair" },
      { value: "dark", label: "Sombre" },
      { value: "system", label: "Automatique (système)" }
    ]);

    createSelect("languageSetting", "Langue :", [
      { value: "fr", label: "Français" },
      { value: "en", label: "Anglais" },
      { value: "es", label: "Espagnol" }
    ]);

    createCheckbox("soundSetting", "Activer les sons");
    createCheckbox("emailNotif", "Recevoir les notifications par e-mail");
  }

  /* ------------------------------------------------------
     PROFIL : CHARGEMENT
  ------------------------------------------------------ */
  function loadProfile() {
    const profil = JSON.parse(localStorage.getItem("profil")) || {
      username: "Nom d'utilisateur",
      statut: "Actif",
      devinettesResolues: 0,
      quizCompletes: 0,
      level: 1,
      points: 0,
      avatar: "./images/avatars/pexels-kadri.jpg",
      privacy: "public",
      notifications: "all",
      theme: "light",
      language: "fr",
      sound: true,
      emailNotif: false,
      history: []
    };

    // Attention : vérifie que ces éléments existent dans ton HTML
    const h2 = document.querySelector("h2");
    if (h2) h2.textContent = profil.username;

    const statutEl = document.getElementById("statut");
    if (statutEl) statutEl.textContent = profil.statut;

    const devinettesEl = document.getElementById("devinettes-resolues");
    if (devinettesEl) devinettesEl.textContent = profil.devinettesResolues;

    const quizEl = document.getElementById("quiz-completes");
    if (quizEl) quizEl.textContent = profil.quizCompletes;

    const levelEl = document.getElementById("currentLevel");
    if (levelEl) levelEl.textContent = profil.level;

    const pointsEl = document.getElementById("totalPoints");
    if (pointsEl) pointsEl.textContent = profil.points;

    const ps = document.getElementById("privacySetting");
    if (ps) ps.value = profil.privacy;
    const ns = document.getElementById("notificationSetting");
    if (ns) ns.value = profil.notifications;
    const ts = document.getElementById("themeSetting");
    if (ts) ts.value = profil.theme;
    const ls = document.getElementById("languageSetting");
    if (ls) ls.value = profil.language;

    const ss = document.getElementById("soundSetting");
    if (ss) ss.checked = !!profil.sound;
    const en = document.getElementById("emailNotif");
    if (en) en.checked = !!profil.emailNotif;

    const img = ensureAvatarBlock();
    if (img) img.src = profil.avatar;

    updateHistory(profil.history);
  }

  /* ------------------------------------------------------
     PROFIL : SAUVEGARDE
  ------------------------------------------------------ */
  function saveProfile() {
    const profil = {
      username: (document.querySelector("h2") && document.querySelector("h2").textContent) || "Nom d'utilisateur",
      statut: (document.getElementById("statut") && document.getElementById("statut").textContent) || "Actif",
      devinettesResolues: +(document.getElementById("devinettes-resolues") && document.getElementById("devinettes-resolues").textContent) || 0,
      quizCompletes: +(document.getElementById("quiz-completes") && document.getElementById("quiz-completes").textContent) || 0,
      level: +(document.getElementById("currentLevel") && document.getElementById("currentLevel").textContent) || 1,
      points: +(document.getElementById("totalPoints") && document.getElementById("totalPoints").textContent) || 0,
      avatar: (document.querySelector(".avatar img") && document.querySelector(".avatar img").src) || "./images/avatars/pexels-kadri.jpg",
      privacy: (document.getElementById("privacySetting") && document.getElementById("privacySetting").value) || "public",
      notifications: (document.getElementById("notificationSetting") && document.getElementById("notificationSetting").value) || "all",
      theme: (document.getElementById("themeSetting") && document.getElementById("themeSetting").value) || "light",
      language: (document.getElementById("languageSetting") && document.getElementById("languageSetting").value) || "fr",
      sound: !!(document.getElementById("soundSetting") && document.getElementById("soundSetting").checked),
      emailNotif: !!(document.getElementById("emailNotif") && document.getElementById("emailNotif").checked),
      history: JSON.parse(localStorage.getItem("profil"))?.history || []
    };

    localStorage.setItem("profil", JSON.stringify(profil));
    alert("Profil enregistré !");
  }

  /* ------------------------------------------------------
     HISTORIQUE
  ------------------------------------------------------ */
  function updateHistory(list) {
    const container = document.getElementById("gameHistory");
    if (!container) return;
    container.innerHTML = "";

    if (!list || list.length === 0) {
      container.innerHTML = "<li>Aucune partie jouée pour le moment.</li>";
      return;
    }

    list.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.type} – Score : ${item.score} – ${item.date}`;
      container.appendChild(li);
    });
  }

  /* ------------------------------------------------------
     ÉDITER LE PROFIL
  ------------------------------------------------------ */
  const editBtn = document.getElementById("editProfileBtn");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      const newName = prompt("Nouveau nom d'utilisateur :");
      if (newName) {
        const h2 = document.querySelector("h2");
        if (h2) h2.textContent = newName;
      }

      if (confirm("Changer l’avatar ?")) {
        const url = prompt("URL de l'image :");
        if (url) {
          const img = document.querySelector(".avatar img");
          if (img) img.src = url;
        }
      }
    });
  }

  /* ------------------------------------------------------
     SAUVEGARDE
  ------------------------------------------------------ */
  const saveBtn = document.getElementById("saveProfileBtn");
  if (saveBtn) saveBtn.addEventListener("click", saveProfile);

  /* ------------------------------------------------------
     INITIALISATION GLOBALE
  ------------------------------------------------------ */
  ensureAvatarBlock();
  ensureExtraSettings();
  loadProfile();
  initAccordions(); // <-- IMPORTANT : on initialise les accordions APRES le chargement du DOM
});
