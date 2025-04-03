// ────────────────────────────────────────────────────────────────────────────────
// ROUTES.JS - Gestion des routes et de l'affichage associé pour le lobby
// ────────────────────────────────────────────────────────────────────────────────

// ─── IMPORTS ────────────────────────────────────────────────────────────────────
import { UIChrono } from "./chrono/chrono.js";
import { UIChat } from "./chat/chat.js";
import { UIRegisterName } from "./queue/connection/connection.js";
import { UILobbyList, UICantQueue, UIQueue } from "./queue/queue.js";
import { userData } from "../../main.js";

// ─── FUNCTIONS ─────────────────────────────────────────────────────────────────

/**
 * Rafraîchit le contenu du DOM en fonction de l'URL actuelle.
 * @param {string} ip - Adresse IP du serveur.
 */
function refreshDOMLobby(ip) {
    const currentUrl = window.location.href;
    let app = document.getElementById('app');

    // Si l'utilisateur est dans la file d'attente
    if (currentUrl == 'http://'+ip+':4321/queue') {
        app.innerHTML = '';
        app.style.backgroundColor = "#1a1a1a"
        app.style.border = "3px solid #f4f4f4"
        UIChrono(app);
        UIQueue(app, userData.username);
        UIChat(app, userData.username);
        UILobbyList(app);
    } 
    // Si la file d'attente est pleine
    else if (currentUrl == 'http://'+ip+':4321/queuefull') {
        app.innerHTML = '';
        UICantQueue(app);
    } 
    // Page d'enregistrement du nom d'utilisateur
    else {
        app.innerHTML = '';
        UIRegisterName(app);
    }
}

/**
 * Modifie l'URL actuelle et rafraîchit le contenu du DOM en conséquence.
 * @param {string} title - Titre de la nouvelle page.
 * @param {string} url - Nouvelle URL.
 * @param {string} ip - Adresse IP du serveur.
 */
export function modifyUrlLobby(title, url, ip) {
    if (typeof (history.pushState) != "undefined") {
        var obj = {
            Title: title,
            Url: url
        };
        history.pushState(obj, obj.Title, obj.Url);
    }

    refreshDOMLobby(ip);
}
