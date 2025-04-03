// ────────────────────────────────────────────────────────────────────────────────
// CONNECTIONS.JS - Gestion de l'enregistrement du nom d'utilisateur
// ────────────────────────────────────────────────────────────────────────────────

// ─── IMPORTS ────────────────────────────────────────────────────────────────────
import { appendChild, createElement } from '../../../../framework/src/domUtils.js';
import { sendToServer } from '../../../../main.js';

/**
 * Envoie le nom d'utilisateur au serveur.
 */
function sendUsernameToServer() {
    let input = document.getElementById('input-username')
    let username = input.value
    input.value = ''

    sendToServer({
        request: 'username',
        value: username
    })
}

// ─── UI COMPONENT ───────────────────────────────────────────────────────────────

/**
 * Initialise et affiche l'interface d'enregistrement du nom d'utilisateur.
 * @param {HTMLElement} appDiv - Élément DOM principal de l'application.
 */
export function UIRegisterName(appDiv) {
    // Construction de l'interface d'enregistrement
    appendChild(appDiv, createElement('div', {id: 'nickname-entry'}, [
        createElement('input', {id: 'input-username', type: 'text', placeholder: 'Enter your username...'}),
        createElement("div", {class: "button-container"}, [
            createElement("div", {class: "container"}, [
                createElement("a", {href: "#", class: "button button--piyo"}, [
                    createElement("div", {class: "button__wrapper"}, [
                        createElement("span", {class: "button__text"}, ["PLAY"])
                    ]),
                    createElement("div", {class: "characterBox"}, [
                        createElement("div", {class: "character wakeup"}, [
                            createElement("div", {class: "character__heart"}, []),
                            createElement("div", {class: "character__hands"}, []),
                            createElement("div", {class: "character__face"}, [])
                        ]), 
                        createElement("div", {class: "character wakeup"}, [
                            createElement("div", {class: "character__heart"}, []),
                            createElement("div", {class: "character__hands"}, []),
                            createElement("div", {class: "character__face"}, [])
                        ]),
                        createElement("div", {class: "character"}, [
                            createElement("div", {class: "character__hands"}, []),
                            createElement("div", {class: "character__face"}, [])
                        ])
                    ])
                ])
            ])
        ])
    ]))

    // Ajout d'un événement d'écoute pour envoyer le nom d'utilisateur lors du clic sur le bouton
    let button = document.getElementsByClassName("button button--piyo")[0]
    button.addEventListener("click", sendUsernameToServer)
    
    // Ajout d'un événement d'écoute pour envoyer le nom d'utilisateur lors de l'appui sur la touche "Entrée"
    let inputField = document.getElementById("input-username")
    inputField.addEventListener("keydown", function(event) {
        let error = document.getElementById("error-username")
        
        if (error != null) {
            error.remove()
        }

        if (event.key === "Enter" || event.keyCode === 13) {
            sendUsernameToServer()
        }
    })
}