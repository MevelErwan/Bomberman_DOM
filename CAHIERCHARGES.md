# Cahier des Charges: Bomberman en Multijoueur avec JavaScript Vanilla

## 1. Introduction

Le but de ce projet est de développer un jeu inspiré de Bomberman, où plusieurs joueurs peuvent se joindre et s'affronter jusqu'à ce qu'il ne reste qu'un seul joueur debout.

## 2. Spécifications Techniques

- **Langage de programmation** : JavaScript Vanilla.
- **Technologies utilisées** : 
  - DOM pour la manipulation graphique.
  - WebSockets pour la communication en temps réel entre les joueurs.
- **Performance** : 
  - Le jeu doit tourner à au moins 60 fps en permanence, sans chute de frames.
  - Utilisation de `requestAnimationFrame` pour les animations.

## 3. Fonctionnalités

### Interface d'accueil

- Champ pour entrer un pseudonyme.
- Page d'attente avec un compteur de joueurs (max 4 joueurs).
- Timer de 10 secondes pour démarrer le jeu si le compteur atteint 4 joueurs avant 20 secondes ou si le compteur est entre 2 et 3 joueurs après 20 secondes.

### Mécaniques de jeu

- **Joueurs** : 
  - 2 à 4 joueurs.
  - Chacun avec 3 vies.
- **Carte** :
  - Vue fixe pour tous les joueurs.
  - Deux types de blocs : destructibles et indestructibles.
  - Placement aléatoire des blocs destructibles.
  - Position de départ des joueurs dans les coins.
- **Power-ups** : 
  - Bombe supplémentaire.
  - Augmentation de la portée de l'explosion.
  - Augmentation de la vitesse de déplacement.
- **Chat** : 
  - Permet aux joueurs de communiquer entre eux via WebSockets.

### Bonus

- Mode Solo + Co-Op avec une IA.
- Power-ups supplémentaires : pousser les bombes, passer à travers les bombes/blocs, détonateur, vie supplémentaire, etc.
- Plus de 4 joueurs.
- Mode équipe : 2v2 ou 3v3.
- Interaction après la mort : les joueurs peuvent revenir à la vie ou mourir définitivement.

## 4. Outils de Développement

- **Navigateurs** : 
  - Firefox.
  - Chrome.
- **Outils** : 
  - Outils de développement intégrés aux navigateurs pour le débogage et la mesure des performances.

## 5. Livrables

- Code source du jeu.
- Documentation technique et utilisateur.
- Tests unitaires et d'intégration.

## 6. Contraintes

- Ne pas utiliser de canvas, WebGL ou d'autres frameworks.
- Utiliser uniquement le DOM et le framework développé lors du projet "mini-framework".

## 7. Évaluation

- Respect des spécifications techniques et fonctionnelles.
- Performance du jeu.
- Qualité du code et de la documentation.
- Expérience utilisateur.

## 8. Conclusion

Ce projet vise à renforcer les compétences en développement JavaScript, en particulier en ce qui concerne la manipulation du DOM, la communication en temps réel avec WebSockets et la création d'un jeu performant et interactif.
