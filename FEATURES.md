# Cahier des Charges: Bomberman en Multijoueur avec JavaScript Vanilla

## Sommaire

1. [Interface d'accueil](#interface-daccueil)
2. [Mécaniques de jeu](#mécaniques-de-jeu)
   - [Joueurs](#joueurs)
   - [Carte](#carte)
   - [Power-ups](#power-ups)
   - [Chat](#chat)
3. [Bonus](#bonus)

---

## Interface d'accueil

Lorsque l'utilisateur accède au jeu, il est accueilli par une interface initiale qui comprend :

- **Pseudonyme** : Un champ où l'utilisateur peut entrer un pseudonyme pour se différencier des autres joueurs.
- **Page d'attente** : Après avoir sélectionné un pseudonyme, l'utilisateur est dirigé vers une page d'attente.
  - **Compteur de joueurs** : Affiche le nombre actuel de joueurs connectés (maximum 4).
  - **Timer** : Si le compteur atteint 4 joueurs avant 20 secondes, ou s'il est entre 2 et 3 joueurs après 20 secondes, un timer de 10 secondes démarre pour signaler le début du jeu.

## Mécaniques de jeu

### Joueurs

- **Nombre** : Le jeu peut accueillir de 2 à 4 joueurs.
- **Vies** : Chaque joueur commence avec 3 vies. Lorsqu'un joueur perd toutes ses vies, il est éliminé du jeu.

### Carte

- **Vue** : La carte est fixe, ce qui signifie que tous les joueurs voient l'intégralité de la carte en permanence.
- **Blocs** : 
  - **Destructibles** : Ces blocs peuvent être détruits par les explosions des bombes. Ils sont placés aléatoirement sur la carte.
  - **Indestructibles** : Ces blocs ne peuvent pas être détruits et sont toujours placés aux mêmes endroits.
- **Position de départ** : Les joueurs commencent le jeu dans les coins de la carte.

### Power-ups

Lorsqu'un bloc destructible est détruit, il peut libérer un power-up que les joueurs peuvent collecter :

- **Bombe supplémentaire** : Augmente le nombre de bombes qu'un joueur peut poser simultanément.
- **Flamme** : Augmente la portée de l'explosion d'une bombe.
- **Vitesse** : Augmente la vitesse de déplacement du joueur.

### Chat

Un chat intégré permet aux joueurs de communiquer entre eux en temps réel :

- **WebSockets** : La communication dans le chat est rendue possible grâce à la technologie WebSockets.
- **Messages** : Les joueurs peuvent envoyer et recevoir des messages pendant la partie.

## Bonus

Des fonctionnalités supplémentaires peuvent être ajoutées pour enrichir l'expérience de jeu :

- **Mode Solo + Co-Op** : Un mode où les joueurs peuvent affronter une IA. Si l'IA est vaincue, tous les joueurs gagnent.
- **Power-ups supplémentaires** : Des power-ups tels que la capacité de pousser des bombes, de passer à travers des bombes ou des blocs, un détonateur pour choisir quand une bombe explose, etc.
- **Plus de 4 joueurs** : La possibilité de jouer avec plus de 4 joueurs.
- **Mode équipe** : Des matchs en 2v2 ou 3v3.
- **Interaction après la mort** : Lorsqu'un joueur meurt, il peut revenir sous forme de fantôme et interagir avec les autres joueurs.