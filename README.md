# Projet 7 de la formation Développement Web d'OpenClassrooms

## Lancer les serveurs :

1) Télécharger, installer et lancer le logiciel XAMPP : https://www.apachefriends.org/fr/index.html,
2) Se connecter à la BDD : ,
// TODO: Ajouter la méthode pour se connecter. Où entrer mdp ?
3) Cliquer sur Start sur les deux premières lignes (Apache et MySQL),
4) *Facultatif : pour consulter la BDD, cliquer sur le bouton Admin de MySQL (possible uniquement si Apache démarré),*
5) Sur l'éditeur de code, dans le terminal de commande, lancer le serveur (commande nodemon depuis le dossier backend),
6) Dans le dossier frontend, taper la commande npm run serve,
7) Ne pas fermer l'éditeur de texte et XAMPP tant que l'application web est utilisée,

## Backend
### Packages à installer :

* bcrypt
* dotenv
* email-validator
* express
* helmet
* jsonwebtoken
* multer
* nodemon
* password-validator
* sequelize


### Fonctionnalités

Pour chaque niveau d'utilisateurs :

* **0 : simple utilisateur :**
  
  - S'enregistrer et se connecter
  - Poster un post
  - Supprimer un de ses posts
  - Consulter tous les posts
  - Liker un post
  - Consulter le détail et les commendaires d'un post
  - Commenter un post
  - Supprimer ses commentaires
  - Modifier son profil en ajoutant une bio, son poste au sein de l'entreprise, une photo de profil
  - Modifier son mot de passe
  - Supprimer son compte
* **1 : modérateur : idem +**
  
  - Modifier un titre
  - Supprimer un post
  - Supprimer des commentaires
* **2 : administrateur : idem +**
  
  - Modifier un profil
  - Supprimer un utilisateur

## Frontend
### Packages à installer :
* sass-loader
* sass

### Fonctionnalités développées

Pour chaque niveau d'utilisateurs :

* **0 simple utilisateur:**

  - 
  - 
  - 
  - 
  - 
  - 
  - 
  - 
  - 
  - 
  - 
  - 
* **1 : modérateur : idem +**
  
  - 
  - 
  - 
* **2 : administrateur : idem +**
  
  - 
  - 
  - 

### Proposition de Fonctionnalités

Ces fonctionnalités peuvent être développées (certaines sont déjà prévues dans le backend) mais n'ont pas été mises en place dans ce MVP, afin de privilégier les fonctionnalités exigées.

Pour chaque niveau d'utilisateurs :

* **0 : simple utilisateur :**

  - S'enregistrer et se connecter
  - Poster un post
  - Supprimer un de ses posts
  - Consulter tous les posts
  - Liker un post
  - Consulter le détail et les commendaires d'un post
  - Commenter un post
  - Supprimer ses commentaires
  - Modifier son profil en ajoutant une bio, son poste au sein de l'entreprise, une photo de profil
  - Modifier son mot de passe
  - Supprimer son compte
  - Accéder à un trombinoscope
* **1 : modérateur : idem +**
  
  - Modifier un titre
  - Supprimer un post
  - Supprimer des commentaires
* **2 : administrateur : idem +**
  
  - Modifier un profil
  - Supprimer un utilisateur
  - Consulter tous les posts et commentaires d'un utilisateur


*Readme à compléter*