# Projet 7 de la formation Développement Web d'OpenClassrooms

## Lancer les serveurs :

1) Télécharger, installer et lancer le logiciel XAMPP : https://www.apachefriends.org/fr/index.html,
2) Cliquer sur Start sur les deux premières lignes (Apache et MySQL),
3) *Facultatif : pour consulter la BDD, cliquer sur le bouton Admin de MySQL (possible uniquement si Apache démarré),*

4) Dans le dossier backend, créer un fichier .env et y écrire :

DB_NAME=[Nom de la BDD]
DB_USER=root
DB_PASSWORD=[Mot de passe de l'utilisateur]
DB_HOST=localhost
DB_PORT=3306
PORT=3000
SECRET_KEY=[Clé secrète]

Remplacer les données entre [] par les données réelles. Si vous n'avez pas de mot de passe, vous pouvez laisser le champ vide.
Ces informations permettront à l'application de se connecter à la BDD et de définir le port d'écoute du backend ainsi que la clé secrète pour chiffrer les mots de passe des utilisateurs.

5) Sur l'éditeur de code, dans le terminal de commande, lancer le serveur (commande "nodemon" ou "node ." depuis le dossier backend),
6) Dans le dossier frontend, taper la commande "npm run serve",
7) Ne pas fermer l'éditeur de texte et XAMPP tant que l'application web est utilisée,

## Backend
### Packages installés :

* bcrypt : https://www.npmjs.com/package/bcrypt
* cors : https://www.npmjs.com/package/cors
* dotenv : https://www.npmjs.com/package/dotenv
* email-validator : https://www.npmjs.com/package/email-validator
* express : https://www.npmjs.com/package/express
* helmet : https://www.npmjs.com/package/helmet
* jsonwebtoken : https://www.npmjs.com/package/jsonwebtoken
* multer : https://www.npmjs.com/package/multer
* mysql2 : https://www.npmjs.com/package/mysql2
* nodemon : https://www.npmjs.com/package/nodemon
* password-validator : https://www.npmjs.com/package/password-validator
* sequelize : https://www.npmjs.com/package/sequelize


### Fonctionnalités

Pour chaque niveau d'utilisateurs :

* **0 : simple utilisateur :**
  
  - S'enregistrer, se connecter et se déconnecter
  - Consulter toutes les publications 
  - Consulter le détail et les commentaires d'une publication
  - Poster une publication
  - Aimer une publication
  - Commenter une publication
  - Editer ses commentaires
  - Supprimer ses commentaires
  - Supprimer ses publications
  - Consulter son profil utilisateur
  - Modifier son mot de passe
  - Modifier son profil en ajoutant une bio, son poste au sein de l'entreprise, une photo de profil
  - Supprimer son compte
  
* **1 : modérateur : idem +**
  
  - Modifier une publication
  - Supprimer une publication
  - Supprimer des commentaires
  
* **2 : administrateur : idem +**
  
  - Modifier n'importe quel commentaire
  - Consulter n'importe quel profil
  - Modifier n'importe quel profil (notamment mail/mot de passe en cas d'oubli)
  - Supprimer un utilisateur

## Frontend
### Packages installés :

* axios : https://www.npmjs.com/package/axios
* es6-promise : https://www.npmjs.com/package/es6-promise
* sass : https://www.npmjs.com/package/sass
* sass-loader : https://www.npmjs.com/package/sass-loader
* vue-router : https://router.vuejs.org/installation.html
* vuex : https://vuex.vuejs.org/installation.html

### Fonctionnalités développées

Pour chaque niveau d'utilisateurs :

* **0 : simple utilisateur:**

  - S'enregistrer, se connecter et se déconnecter
  - Consulter toutes les publications 
  - Consulter le détail et les commentaires d'une publication
  - Poster une publication
  - Aimer une publication
  - Commenter une publication
  - Supprimer ses commentaires
  - Supprimer ses publications
  - Consulter son profil utilisateur
  - Modifier son mot de passe
  - Modifier son profil en ajoutant une bio, son poste au sein de l'entreprise, une photo de profil
  - Supprimer son compte 
  
* **1 : modérateur : idem +**
  
  - Supprimer n'importe quelle publication
  - Supprimer n'importe quel commentaire

* **2 : administrateur : idem**

### Proposition de Fonctionnalités

Ces fonctionnalités peuvent être développées (certaines sont déjà prévues dans le backend) mais n'ont pas été mises en place dans ce MVP, afin de privilégier les fonctionnalités exigées.

Pour chaque niveau d'utilisateurs :

* **0 : simple utilisateur :**

  - Editer ses commentaires
  - Accéder à un trombinoscope
  
* **1 : modérateur : idem +**
  
  - Editer une publication
  
* **2 : administrateur : idem +**
  
  - Editer n'importe quel commentaire
  - Consulter n'importe quel profil
  - Modifier n'importe quel profil (notamment mail/mot de passe en cas d'oubli)
  - Supprimer un utilisateur
  - Consulter une liste de toutes les publications et commentaires d'un utilisateur précis