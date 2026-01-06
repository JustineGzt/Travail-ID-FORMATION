// Exercice 1 : Tu dois simuler le score final d’un joueur après une partie compétitive.


let joueur = {
    kills : 10,
    // score : 10 * kills,
    deaths : 2,
    assists : 5,
    score : 0, 
    regles : {
        elimination : 100,
        assistance : 40,
        mort : 75,
    }
}

joueur.score = joueur.kills * 250 ; 
joueur.score += joueur.deaths *- 75 ; 
joueur.score += joueur.assists * 40 ; 
if (joueur.kills % 2 === 0) {
    joueur.score += 250;
};


if (joueur.kills > joueur.deaths && joueur.assists > 3 ) {
    joueur.score *= 1.5
};

console.log(joueur.score);

// ## Exercice 2 :Tu dois simuler le calcul final d’une commande d’entreprise composée de plusieurs machines.


let commandeEntrepise = {
    donnees : {
        fidelite : 5,
        urgence : true,
        production : {
            robotsChauffeurs :{
                quantite : 2,
                prix : 32950,
                total: 0,    
            }, 
            presseHydraulique :{
                quantite : 1,
                prix : 45500,
                total: 0,    

            },
            gestion : {
                tableauxDeContrôles : {
                    quantite : 3,
                    prix : 12990,
                    total: 0,    
                },        
            }
        },
        maintenance : {
            capteursThermiques : {
                    quantite : 10,
                    prix : 399, 
                    total: 0,    
                }
        }
    }
};

commandeEntrepise.total = commandeEntrepise.robotsChauffeurs.quantite + commandeEntrepise.presseHydraulique.quantite * 1.08 ; 
commandeEntrepise.total += commandeEntrepise.gestion.quantite * 1.03 ; 
commandeEntrepise.total += commandeEntrepise.maintenance.quantite

console.log(object);


//  Exervice 2 + 2







