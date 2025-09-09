# GameRadar

## Description du projet : de l'idée à la réalisation

L'idée initiale était de créer un site web dans le domaine du **gaming**, avec pour objectif de regrouper des contenus et des recommandations.  
Nous avons choisi de créer une **bibliothèque numérique** regroupant à la fois des **articles** sous forme de news et des **jeux**. Ce projet s'appellera **GameRadar**.

## Problème / Solution & Retour d'expérience

### Problèmes rencontrés et solutions apportées

- **Commentaires de commits incorrects**  
  Nous avons rencontré des difficultés liées à des commits mal nommés : deux commits avaient été nommés temporairement `Test` et `Test2`, ce qui ne reflétait pas leur contenu réel. Pour corriger cela, nous avons dû trouver un moyen de modifier les commentaires de ces commits après coup, ce qui nous a amené à utiliser des commandes Git comme `rebase -i`.

- **Fusion automatique lors des commits**  
  Un autre souci récurrent concerne un comportement inattendu lors des commits de Loïc : un merge se fait automatiquement sans qu'il le demande explicitement. Nous devons encore analyser précisément l'origine du problème (configuration locale ? branche mal positionnée ?) et cherchons actuellement une solution pour mieux contrôler les fusions. Problème résolu : Cela vient du fait que nous ne faisions pas la commande Git pull avant de faire git push. Sinon nos deux versions devaient fusionner sur Git. 

- **Départ avec une grosse partie d'utilisation pure du CSS**  
  Nous étions partis dès le départ sur utilisation massive du CSS pour faire nos pages mais nous nous sommes vite rendus compte que dans la pratique cela aurait été bien plus colossal que prévu, surtout dans la vraie vie où il y aurait pu avoir beaucoup plus de pages. Nous nous sommes tournées vers l'utilisation de Bootstrap à la place.

- **Utilisation de ressources dans le répertoire public**  
  Jérémie dans le répertoire voulait mettre les images des titres de jeux dans assets mais quand il le faisait ces documents étaient injoignables. Il a pu pallier ça en les mettant dans le répertoire public à la place.

- **Gestion des chemins d'images entre développement local et GitHub Pages**
  Les images s'affichaient correctement en développement local (npm run dev), mais pas sur GitHub Pages. Nous avons résolu ce problème en implémentant une méthode getUrl qui détecte l'environnement et adapte les chemins d'accès :
  methods: {
  getUrl(path) {
    return (window.location.hostname !== 'localhost' ? '/projet24-hyakumeteam' : '') + path;
  }
} 
  Cette fonction est ensuite utilisée dans les templates pour les images :
  img :src="getUrl(game.imageUrl)" alt="..."

- **Responsivité et mise en page sur grands écrans**  
  Nous avons rencontré un problème où les cartes de jeux s'étiraient excessivement sur les grands écrans, ce qui nuisait à l'esthétique du site. Pour résoudre ce problème, nous avons implémenté un conteneur à largeur limitée qui maintient une présentation cohérente quelle que soit la taille de l'écran. Solution : ajout d'une classe `custom-container` avec une `max-width` définie et des marges automatiques pour centrer le contenu.

- **Optimisation des images des cartes de jeux**  
  Les dimensions des images des cartes de jeux n'étaient pas uniformes, certaines étaient trop petites ou mal cadrées. Nous avons appliqué des propriétés CSS comme `object-fit: cover` pour garantir que toutes les images s'affichent correctement dans leur conteneur, quelle que soit leur taille d'origine.
  
- **Utilisation de Bootstrap**
  Nous avions mis au début de notre projet, Bootstrap dans notre index.html pour l'utiliser. Cependant, ce n'était pas la bonne pratique. Après remarques du professeur, nous avons fait npm instrall bootstrap (version...) pour l'installer pour l'importer dans le main.js.

- **Lien invalide ou utilisateur non reconnu**
  Le lien de connexion ne fonctionnait pas toujours correctement si l'adresse e-mail n'était pas exactement celle stockée dans le localStorage, ou si le lien était ouvert dans un autre navigateur ou onglet.

- **auth.currentUser toujours null après connexion**
  Cela venait d’un mauvais paramétrage du lien de redirection (url) dans actionCodeSettings, ou d’une mauvaise persistance de session côté Firebase.

- **localhost non autorisé**
  Depuis avril 2025, Firebase ne considère plus localhost comme un domaine autorisé par défaut. Il a fallu l’ajouter manuellement dans la console Firebase.

- **URL de redirection incorrecte en production**
  Sur GitHub Pages, le lien devait inclure le chemin complet du projet (ex: https://heg-web.github.io/projet24-hyakumeteam/#/finishSignIn) pour fonctionner. L'oubli de cette précision empêchait la connexion.

- **Double affichage onAuthStateChanged**
  Une fois connecté, Firebase met parfois un peu de temps à déclencher le bon état d’authentification ; il a fallu ajouter un délai pour que l’état connecté soit bien détecté.

### Ce qui a fonctionné

- **L'approche composant avec Vue.js**  
  La structure en composants nous a permis de créer un code modulaire et réutilisable, facilitant la maintenance et les évolutions futures.

- **Le système de filtrage et tri des jeux**  
  L'implémentation d'un système dynamique permettant aux utilisateurs de filtrer les jeux par console, genre, et de les trier selon différents critères (alphabétique, année, note) a considérablement amélioré l'expérience utilisateur.

- **Les effets visuels sur les cartes de jeux**  
  Les animations subtiles (élévation, zoom) au survol des cartes de jeux ont rendu l'interface plus interactive et engageante pour les utilisateurs.

## Principales leçons apprises

- L'importance de bons **messages de commit** et d'une bonne gestion de branches dans Git.
- Le besoin de bien configurer chaque poste pour éviter les conflits automatiques.
- La communication dans l'équipe est essentielle, surtout lorsqu'on touche à des aspects sensibles comme la gestion de version.
- Utilisation des frameworks CSS comme Bootstrap pour accélérer le design.
- Utilisation des packages comme fontawesome pour gagner du temps sur le travail des icônes/images.
- **Importance de la conception responsive dès le départ** : Plutôt que d'ajouter la responsivité comme une réflexion après-coup, il est préférable de la considérer dès le début du développement.
- **Valeur des tests sur différentes tailles d'écran** : Vérifier régulièrement le rendu sur différents appareils nous a permis d'identifier et de corriger les problèmes avant qu'ils ne deviennent trop complexes.
- **Équilibre entre esthétique et performance** : Nous avons appris à trouver le bon équilibre entre une interface visuellement attrayante et des performances optimales, notamment en ce qui concerne la gestion des images et des animations.
- **Avantages de l'approche incrémentale** : Développer par petites itérations, en testant chaque nouvelle fonctionnalité, s'est avéré plus efficace que de tenter d'implémenter de grandes parties du site en une seule fois.
- **npm run dev** : Travailler en local avec npm run dev est extrêmement agréable, pour pouvoir tester toutes sortes de choses, sans faire 300 commits et s'occuper de cet aspect là plus tard quand on est à peu près satisfaits.

