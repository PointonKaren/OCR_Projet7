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
### Packages installés :

* bcrypt : https://www.npmjs.com/package/bcrypt
* dotenv : https://www.npmjs.com/package/dotenv
* email-validator : https://www.npmjs.com/package/email-validator
* express : https://www.npmjs.com/package/express
* helmet : https://www.npmjs.com/package/helmet
* jsonwebtoken : https://www.npmjs.com/package/jsonwebtoken
* multer : https://www.npmjs.com/package/multer
* nodemon : https://www.npmjs.com/package/nodemon
* password-validator : https://www.npmjs.com/package/password-validator
* sequelize : https://www.npmjs.com/package/sequelize


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
  - Editer ses commentaires
  - Supprimer ses commentaires
  - Consulter et modifier son profil en ajoutant une bio, son poste au sein de l'entreprise, une photo de profil
  - Modifier son mot de passe
  - Supprimer son compte
* **1 : modérateur : idem +**
  
  - Modifier un titre de post
  - Supprimer un post
  - Supprimer des commentaires
* **2 : administrateur : idem +**
  
  - Modifier n'importe quel commentaire
  - Consulter n'importe quel profil
  - Modifier n'importe quel profil (notamment mail/mot de passe en cas d'oubli)
  - Supprimer un utilisateur

## Frontend
### Packages installés :

* axios : https://www.npmjs.com/package/axios
* sass : https://www.npmjs.com/package/sass
* sass-loader : https://www.npmjs.com/package/sass-loader
* vue-router : https://router.vuejs.org/installation.html
* vuex : https://vuex.vuejs.org/installation.html

### Fonctionnalités développées

Pour chaque niveau d'utilisateurs :

* **0 simple utilisateur:**

  - S'enregistrer et se connecter
  - Consulter tous les posts 
  - Consulter le détail et les commendaires d'un post
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
  
* **2 : administrateur : idem +**
  
  - 
  - 
  - 

### Proposition de Fonctionnalités

Ces fonctionnalités peuvent être développées (certaines sont déjà prévues dans le backend) mais n'ont pas été mises en place dans ce MVP, afin de privilégier les fonctionnalités exigées.

Pour chaque niveau d'utilisateurs :

* **0 : simple utilisateur :**

  - Poster un post
  - Supprimer un de ses posts
  - Liker un post
  - Commenter un post
  - Editer ses commentaires
  - Supprimer ses commentaires
  - Consulter et modifier son profil en ajoutant une bio, son poste au sein de l'entreprise, une photo de profil
  - Modifier son mot de passe
  - Supprimer son compte
  - Accéder à un trombinoscope
  
* **1 : modérateur : idem +**
  
  - Modifier un titre de post
  - Supprimer un post
  - Supprimer des commentaires
* **2 : administrateur : idem +**
  
  - Modifier n'importe quel commentaire
  - Consulter n'importe quel profil
  - Modifier n'importe quel profil (notamment mail/mot de passe en cas d'oubli)
  - Supprimer un utilisateur
  - Consulter une liste de tous les posts et commentaires d'un utilisateur précis


*Readme à compléter*