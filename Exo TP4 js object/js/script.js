// Exercice 1 : Créez un objet "pc" avec les propriétés suivantes :

let pc = {
	marque : "Asus",
	ram : 16,
	stockage : false
};


// Exercice 2 : De cet objet affiche le nom de la marque. Avec la notation en crochet, afficher le stockage.

console.log(pc.marque);


// Exercice 3 : Change la valeur de la ram à 32.

pc.ram = 32;

// Exercice 4 : Ajoute la propriété processeur avec la valeur Intel i7.


pc.processeur = "Intel i7";


// Exercice 5 : Récupérer dans la tableau les clés de l’objet pc, mais aussi un tableau de ses valeurs et finalement un tableau des deux.

console.log(Object.keys(pc));
console.log(Object.values(pc));
console.log(Object.entries(pc));

// Exercice 6 : Supprime la propriété processeur de l’objet.

delete pc.processeur;

// Exercice 7 : Ajoute une propriété config contenant os windows et version 11.

pc.config = {
    os : "windows",
    version : 11
};


// Exercice 8 : Ajoute une propriété ports contenant USB, HDMI et Wifi.

pc.ports = ["USB", "HDMI", "Wifi"];

// Exercice 9 : Dans ports, retire USB et ajoute à la place USB-C.

delete pc.usb;
pc.ports.splice(0, 1, "USB-C");

// Exercice 10 : Dans ports, remplace Wifi par Ethernet avec splice.

pc.ports.splice(2, 1, "Ethernet");

// Exercice 11 : Créer un nouvelle objet pc2 basé sur l’objet pc et modifie la marque par HP sans affecté l’objet pc


let pcDeux = { ...pc };
pcDeux.marque = "HP";

// Exercice 12 : Ajoute à l’objet pc une propriété system avec un boot contenant UEFI et securite contenant tpm sur true. Créer un nouvelle objet pcNotSecure et passe le tpm sur false sans affecter l’objet pc.

// let pcDeux = {
//     system :  {
//         boot : "UEFI",
//         securite : {
//             tpm : true
//         }
//     }
// }

// Exercice 13 : Crée un objet magasin avec une propriété stock contenant le produit souris au prix de 49 € avec une quantité de 10 et le produit clavier au prix de 89 € avec une quantité de 5. 

let magasin = {
    stock : {
        souris: {
            prix : 49,
            quantite : 10  
        },
        clavier: {
            prix : 89,
            quantite : 5,
        }
    }
    };

console.log(magasin.stock.clavier.prix );


// Exercice 14 : 3 nouveaux clavier viennent d’être livrés, ajoute les à notre stock déjà disponible.

let newquantite = magasin.clavier;

newquantite.quantite = 5 + 3;

console.log(newquantite);

// Exercice 15 : Dans le magasin, un nouveau produit vient d’arriver. Ajoute le produit RAM qui coûte 129.60 € avec une quantité de 6.

magasin ={
    raw : 129.60,
    qualite : 6
    }

// Exercice 16 : Dans le même magasin, supprime l’élément souris via son index.



// Exercice 17 : Crée un nouvelle objet magasin2 et ajoute y :

let magasin2 = {
    nom : "Le tech shop",
    localisation : Paris,
    magasinOuvert : true   || false,
    employer: 3, 
    stock : {
        CPU : {
            prix : 299,
            quantite : 5
        },
        GPU : {
            prix : 699,
            quantite : 2
        },
        RAM : {
            prix : 129, 
            quanite : 12
        }
    },
    securite : {
        camera : 4,
        alarme : true || false, 
    },
    port : {
        USBC : 1, 
        HDMI : 1
    }

}

magasin2.ram = "DDR5";
magasin2.ram.prix = 199;

magasin2.stock = SDD;
magasin2.SDD.quantite =  7 ;
magasin2.SDD.prix = 159 ;


delete magasin2.GPU;

let magasin2Backup = {...magasin2}

console.log(magasin2Backup.employer = 2);
console.log(magasin2Backup.agentdesecurite);
console.log(magasin2Backup.agentdesecurite = 1);
console.log(magasin2Backup.securite.camera = 6);
console.log(magasin2Backup.email);
console.log(magasin2Backup.email = "letechshop");
console.log(magasin2Backup.stock = 350);
console.log(magasin2Backup.reparation);
console.log(magasin2Backup.listreparation.montage);
console.log(magasin2Backup.listreparation.montage = 180);
console.log(magasin2Backup.listreparation.reparation);
console.log(magasin2Backup.listreparation.reparation = 80);
console.log(magasin2Backup.listreparation.installationOs);
console.log(magasin2Backup.listreparation.installationOs = 20);
console.log(magasin2Backup.recuperationDonee);
console.log(magasin2Backup.recuperationDonee = 120);






