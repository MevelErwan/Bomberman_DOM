// ────────────────────────────────────────────────────────────────────────────────
// SOCKETRECEPTION.JS - Gestion des messages reçus via WebSocket pour le lobby
// ────────────────────────────────────────────────────────────────────────────────

// ─── IMPORTS ────────────────────────────────────────────────────────────────────
import { AddPlayerToList } from '../lobby/features/queue/queue.js';
import { addNewMessage } from '../lobby/features/chat/chat.js';
import { modifyUrlLobby } from './features/routes.js';
import { userData } from '../main.js';
import { appendChild, createElement } from '../framework/src/domUtils.js';

// ─── FUNCTION ──────────────────────────────────────────────────────────────────

/**
 * Traite les messages reçus via WebSocket pour le lobby.
 * @param {Object} data - Données reçues via WebSocket.
 * @param {string} ip - Adresse IP du serveur.
 */
export function socketReceptionLobby(data, ip) {
    let app = document.getElementById("app")
    // Redirection vers la file d'attente
    if (data["request"] == "GoToQueue") {
        userData.username = data["value"];
        console.log("salut")
        modifyUrlLobby("Queue", "/queue", ip);
    } 
    // Gestion d'une erreur lors de la tentative de rejoindre la file d'attente
    else if (data["request"] == 'Can\'t join Queue') {
        modifyUrlLobby("Error Joinning Queue", "/queuefull", ip);
    } 
    // Mise à jour du nombre de joueurs dans la file d'attente
    else if (data["request"] == "refreshPlayerCountQueue") {
        const el = document.getElementById('player-count');
        el.textContent = data["playercount"].toString() + "/4";
    } 
    // Mise à jour de la liste des noms des joueurs dans le lobby
    else if (data["request"] == "refreshNameListLobby") {
        document.getElementById("lobby-players").innerHTML = '';
        let temp = data["value"];
        temp.sort();
        for (let name of data["value"].sort()) {
            AddPlayerToList(name);
        }
    } 
    // Ajout d'un nouveau message au chat
    else if (data["request"] == "newChat") {
        addNewMessage(data["author"], data["text"]);
    } 
    // Mise à jour de l'affichage du chrono
    else if (data["request"] == "chrono") {
        document.getElementById("chrono-time").innerText = data["value"];
    } else if (data["request"] == "Username already used") {
        appendChild(app, createElement("div", {id: "error-username"}, [
            createElement("h1", {id: "error-username title"}, ["Error"]),
            createElement("p", {id: "error-username info"}, [data["value"] + " is already used as username"])
        ]))
    } else if (data["request"] == "Username empty") {
        appendChild(app, createElement("div", {id: "error-username"}, [
            createElement("h1", {id: "error-username title"}, ["Empty Username"]),
            createElement("p", {id: "error-username info"}, ["Please enter your username before joining"])
        ]))
    } else if (data["request"] == "Game in working") {
        appendChild(app, createElement("div", {id: "error-username"}, [
            createElement("h1", {id: "error-username title"}, ["Game in progress"]),
            createElement("p", {id: "error-username info"}, ["You'll need to wait, a game is already in progress"])
        ]))
    }
}
