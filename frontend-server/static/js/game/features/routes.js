// ─── FUNCTIONS ─────────────────────────────────────────────────────────────────

import { construct_map } from "./map/map.js";
import { MapID } from "../socketReception.js";

/**
 * Rafraîchit le contenu du DOM en fonction de l'URL actuelle.
 * @param {string} ip - Adresse IP du serveur.
 */
function refreshDOMGame(ip, data) {
    const currentUrl = window.location.href;
    let app = document.getElementById('app');
    
    switch (currentUrl) {
        case "http://"+ip+":4321/game": {
            app.innerHTML = ''
            document.getElementById("main-container").style.display = 'block'
            construct_map(MapID, data["blocks"])
        }
    }
}

/**
 * Modifie l'URL actuelle et rafraîchit le contenu du DOM en conséquence.
 * @param {string} title - Titre de la nouvelle page.
 * @param {string} url - Nouvelle URL.
 * @param {string} ip - Adresse IP du serveur.
 */
export function modifyUrlGame(title, url, ip, data) {
    if (typeof (history.pushState) != "undefined") {
        var obj = {
            Title: title,
            Url: url
        };
        history.pushState(obj, obj.Title, obj.Url);
    }

    refreshDOMGame(ip, data);
}
