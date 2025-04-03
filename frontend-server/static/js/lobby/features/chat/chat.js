// ────────────────────────────────────────────────────────────────────────────────
// CHAT.JS - Gestion de l'interface utilisateur pour le chat
// ────────────────────────────────────────────────────────────────────────────────

// ─── IMPORTS ────────────────────────────────────────────────────────────────────
import { appendChild, createElement } from "../../../framework/src/domUtils.js";
import { socket } from "../../../main.js";

// ─── UI COMPONENT ───────────────────────────────────────────────────────────────

/**
 * Initialise et affiche l'interface du chat sur la page.
 * @param {HTMLElement} app - Élément DOM principal de l'application.
 * @param {string} username - Nom d'utilisateur actuel.
 */
export function UIChat(app, username) {
    // Construction de l'interface du chat
    appendChild(app, createElement("div", {id: "chat-container"}, [
        createElement("div", {id: "chat-header"}, ["BomberChat"]),
        createElement("div", {id: "chat-messages"}),
        createElement("div", {id: "chat-input-container"}, [
            createElement("input", {id: "chat-input", type: "text", placeholder: "Type your message..."}),
            createElement("button", {id: "chat-send-button"}, ["Send"])
        ])
    ]));

    // Gestionnaire d'événements pour le bouton d'envoi de message
    let button = document.getElementById("chat-send-button");
    button.addEventListener("click", function() {
        const text = document.getElementById("chat-input").value;
        if (text != "") {
            sendMessageToServer(socket, username, text);
            document.getElementById("chat-input").value = '';
        }
    });

    // Gestionnaire d'événements pour envoyer un message avec la touche "Entrée"
    let inputField = document.getElementById("chat-input");
    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            const text = document.getElementById("chat-input").value;
            if (text != "") {
                sendMessageToServer(socket, username, text);
                document.getElementById("chat-input").value = '';
            }
        }
    });
}

// ─── CHAT FUNCTIONS ─────────────────────────────────────────────────────────────

/**
 * Ajoute un nouveau message à la fenêtre de chat.
 * @param {string} author - Auteur du message.
 * @param {string} text - Contenu du message.
 */
export function addNewMessage(author, text) {
    let parent = document.getElementById("chat-messages");
    appendChild(parent, createElement('div', {class: "chat-message"}, [
        createElement("span", {class: "chat-author"}, [author]),
        text
    ]));
}

/**
 * Envoie un message au serveur via WebSocket.
 * @param {WebSocket} socket - Instance WebSocket pour la communication.
 * @param {string} author - Auteur du message.
 * @param {string} text - Contenu du message.
 */
export function sendMessageToServer(socket, author, text) {
    socket.send(JSON.stringify({request: "chatWithHommies", author: author, text: text}));
}
