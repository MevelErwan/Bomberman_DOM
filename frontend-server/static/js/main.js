// ────────────────────────────────────────────────────────────────────────────────
// MAIN.JS - Point d'entrée de l'application
// ────────────────────────────────────────────────────────────────────────────────

// ─── IMPORTS ────────────────────────────────────────────────────────────────────
import { createElement } from '../js/framework/src/domUtils.js';
import { socketReceptionGame } from './game/socketReception.js';
import { modifyUrlLobby } from './lobby/features/routes.js';
import { socketReceptionLobby } from './lobby/socketReception.js';

// ─── GLOBAL VARIABLES ──────────────────────────────────────────────────────────
export let ip = window.location.href.split("/")[2].split(":")[0];  // Adresse IP du serveur WebSocket

export let socket = new WebSocket("ws://"+ip+":1234/ws");  // Connexion WebSocket

// Stockage des données utilisateur
export let userData = {
    username: "",
    speed: 0.1,
    bomb_range: 2,
    bomb_posable: 1,
    life : 3,
    recovery: false,
    ignore_bomb:0,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
};
export let MapData = {
    build: false,
    map: [],
    powerUpPlace: [],
    
}

// ─── EVENT LISTENERS ───────────────────────────────────────────────────────────
// Gestion des messages reçus via WebSocket
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);  // Conversion du message JSON en objet
    console.log(event.data)
    socketReceptionLobby(data, ip);  // Traitement du message
    socketReceptionGame(data, ip)
}

// ─── FUNCTIONS ─────────────────────────────────────────────────────────────────
// Envoi de données au serveur via WebSocket
export function sendToServer(toSend) {
    socket.send(JSON.stringify(toSend));
}

// ─── INITIALIZATION ────────────────────────────────────────────────────────────
// Création et initialisation du conteneur principal de l'application
const appContainer = createElement('div', { id: 'app' }, []);
document.body.appendChild(appContainer);

document.getElementById("main-container").style.display = 'None'

// Mise à jour de l'URL pour la page d'accueil
modifyUrlLobby('Homepage', '/');

// Gestion de la fermeture de la fenêtre/tab du navigateur
window.onbeforeunload = function() {
    window.location.href = "/";
    return "Are you sure?";
};
