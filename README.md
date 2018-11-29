# Projet 5G

## Prérequis
1. Installer NodeJs v8.12.0 (Procédure d'installation sur [https://nodejs.org/en/](https://nodejs.org/en/)) 

## Procédure d'installation
1. Cloner le repo git : ```git clone git@ssh.dev.azure.com:v3/jimmymammeri/5GYnov/5GYnov```
1. Se placer dans le projet : ```cd 5GYnov```
1. Installer les dépendances : ```npm install```
1. Dans le fichier `src/environments/environment.ts` modifier la variable `backendUrl` pour lui donner l'adresse du serveur backend
1. Compiler le projet : ```ng build --prod``` 
1. Placer le dossier du projet (dans le dossier `dist/`) sur votre seveur
1. Alternativement, la commande `ng serve` permet de faire tourner le projet sur `localhost:4200`

## Tests unitaires
Les tests unitaires ont été effectués uniquement sur les services, donc sur les appels à l'API. Ils peuvent être lancés à partir de la commande ```ng test```.

## Fonctionnalités
La plupart des spécifications ont été implémentées, à quelques exceptions près :
1. Il n'est pas possible de cliquer sur l'avatar d'un utilisateur pour l'intégrer à une conversation
1. On ne récupère les messages d'une conversation qu'une seule fois, en même temps qu'on récupère la conversation
1. Il n'est pas posibble de supprimer/éditer d'autres membres

## Architecture du projet
Le code de l'application est situé dans ```src/app```.

Dans src/app, on retrouve :
- `module-name` : Dossier contenant un module de l'application. Il contient un fichier [module-name].module.ts qui décrit le module (les dépendances, les composants utilisés...).
Il contient aussi un dossier components qui regroupe tous les composants propres au module.
- `config` : dossier contenant des fichiers de configuration, notamment `routes.ts` qui décrit les routes front de l'application
- `guards` : dossier qui regroupe des guards, c'est à dire des fonctions à éxécuter lors d'un changement de route
- `interceptors` : dossier qui contient notamment le fichier `auth.interceptor.ts`, qui attache le JWT à chaque requête HTTP sortante
- `models` : dossier qui contient les modèles, de simples classes qui décrivent les proprietés des différentes entités du projet.
- `services` : dossier qui contient les services, ce sont des classes qui définissent les fonctions pour intéragir avec le backend.
- `app.module.ts` : Le module principal de l'application, qui va importer les autres modules.

Les composants en Angular sont formés de 4 fichiers : 
- `[comp-name].component.html` : la vue dans laquelle on décrit la structure de la page
- `[comp-name].component.ts` : fichier qui fait office de controlleur, dans lequel on gère la logique du composant
- `[comp-name].component.scss` : fichier pour ajouter du style au composant
- `[comp-name].component.spec.ts` : fichier dans lequel sont décrits les tests pour ce composant 

Les routes de l'API sont écrites dans le fichier `src/environments/environment.ts`

## Choix des technologies
Afin de concevoir le lot 1 « Messagerie instantanée » pour la partie front-end, nous avons dû prendre certaines décisions sur les technologies à utiliser. Dans un premier temps, nous nous sommes tournés vers NodeJS.  

NodeJS est un environnement d’exécution Javascript construit sur le moteur JavaScript V8 de Chrome. Node.js utilise un modèle basé sur l’évènementielle et des entrées/sorties non bloquantes, ce qui le rend léger et efficace. L’écosystème de logiciel de Node.js, npm, est le plus grand écosystème de bibliothèque open source au monde. NodeJS peut être utilisé sur la partie front-end mais aussi sur la partie back-end. Dans notre cas, NodeJS sera principalement utilisé pour son système de gestion de packets (NPM) et pour avoir un serveur de développement. 

Ensuite, nous utiliserons « Angular ». Angular a été développé par Google, il en est actuellement à la version 7. Il s’agit d’un Framework complet, celui-ci dispose d’une communauté assez conséquente, son architecture est élégante et très dogmatique. Il possède un moteur d’injection de dépendances et celui-ci est bien documenté. Angular impose l’utilisation du Type script, langage très normé qui force à coder de manière stricte et propre. Nous avons choisi ce Framework car il s’agit d’un des plus connus, son efficacité n’est plus à démontrer. De plus, nous sommes deux dans le groupe à connaître cette technologie et à pouvoir transférer nos compétences aux autres membres. 

Pour la partie site statique, nous avons choisi le système de templating « Mustache ». En effet, une des contraintes de cette partie était de ne pas utiliser de Javascript. Ce système permet de créer un affichage conditionnel sans l’emploi de Javascript et donc de respecter les contraintes. Nous avons choisi Mustache en accord avec les autres équipes (frontend et backend), car il s’agit d’un moteur compatible avec la plupart des langages backend. 

Enfin, encore pour la partie statique du site, nous avons décidé de réaliser nos interfaces en Material Design. Nous allons donc utiliser le Framework « Materialize CSS ». Ce Framework permet de reproduire en un rien de temps des pages web dans le style du Material Design en réutilisant des modèles prêts à l’emploi. Littéralement, il s’agit d’avoir un cadre de travail dont la promesse est de respecter une charte graphique, en l’occurrence ici, celle du Material Design.  
