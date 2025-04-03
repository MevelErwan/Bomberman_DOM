// ────────────────────────────────────────────────────────────────────────────────
// QUEUE.JS - Gestion de l'interface utilisateur pour la file d'attente du lobby
// ────────────────────────────────────────────────────────────────────────────────

// ─── IMPORTS ────────────────────────────────────────────────────────────────────
import { createElement, appendChild } from "../../../framework/src/domUtils.js";

// ─── UI COMPONENTS ──────────────────────────────────────────────────────────────

/**
 * Affiche l'interface de la file d'attente pour un utilisateur.
 * @param {HTMLElement} app - Élément DOM principal de l'application.
 * @param {string} username - Nom d'utilisateur actuel.
 */
export function UIQueue(app, username) {
    appendChild(app, createElement('div', {id: 'queue'}, [
        createElement('h1', {id: 'username'}, [username]),
        createElement('p', {id: 'state-page'}, ['Waiting for players...']),
        createElement('p', {id: 'player-count'}, ['1/4'])
    ]));
}

/**
 * Affiche un message indiquant que la file d'attente est pleine.
 * @param {HTMLElement} app - Élément DOM principal de l'application.
 */
export function UICantQueue(app) {
    appendChild(app, createElement('div', {id: 'cant-queue'}, [
        createElement('h1', {id: 'info'}, ["Queue Already Full"]),
        createElement('p', {}, ["Try later..."])
    ]));
}

/**
 * Affiche la liste des joueurs dans le lobby.
 * @param {HTMLElement} app - Élément DOM principal de l'application.
 */
export function UILobbyList(app) {
    appendChild(app, createElement("div", {id: "lobby-container"}, [
        createElement("div", {id: "lobby-header"}, ["Joueurs dans le Lobby"]),
        createElement("div", {id: "lobby-players"}, [])
    ]));
}

// ─── PLAYER MANAGEMENT ──────────────────────────────────────────────────────────

/**
 * Ajoute un joueur à la liste du lobby.
 * @param {string} player - Nom du joueur à ajouter.
 */
export function AddPlayerToList(player) {
    let list = document.getElementById("lobby-players");
    appendChild(list, createElement("div", {class: "lobby-player", id: player}, [player]));
}

/**
 * Supprime un joueur de la liste du lobby.
 * @param {string} player - Nom du joueur à supprimer.
 */
export function removePlayer(player) {
    document.getElementById(player).remove();
}
