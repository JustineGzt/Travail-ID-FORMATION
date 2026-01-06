require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Pour servir tes fichiers front (register.html, login.html)
app.use(express.static('../'));

// Route pour callback OAuth Discord
app.get('/discord/callback', async (req, res) => {
    const code = req.query.code;

    if(!code) return res.send("Erreur : aucun code reçu");

    try {
        // Échanger le code contre un token
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI,
            scope: 'identify email'
        }).toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const accessToken = tokenResponse.data.access_token;

        // Récupérer les infos utilisateur
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const user = userResponse.data;

        // Ici tu peux créer ou connecter ton compte dans ta DB
        console.log("Utilisateur Discord :", user);

        // Redirection vers index.html
        res.redirect('../index.html');

    } catch (err) {
        console.error(err);
        res.send("Erreur lors de l'authentification Discord");
    }
});

app.listen(port, () => console.log(`Serveur Discord OAuth lancé sur http://localhost:${port}`));
        