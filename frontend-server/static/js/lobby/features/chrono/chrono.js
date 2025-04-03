// ────────────────────────────────────────────────────────────────────────────────
// CHRONO.JS - Gestion de l'interface utilisateur pour le chronomètre
// ────────────────────────────────────────────────────────────────────────────────

// ─── IMPORTS ────────────────────────────────────────────────────────────────────
import { appendChild, createElement } from "../../../framework/src/domUtils.js";

// ─── UI COMPONENT ───────────────────────────────────────────────────────────────

/**
 * Initialise et affiche l'interface du chronomètre sur la page.
 * @param {HTMLElement} app - Élément DOM principal de l'application.
 */
export function UIChrono(app) {
    // Construction de l'interface du chronomètre
    appendChild(app, createElement("div", {id: "chrono-container"}, [
        createElement("div", {id: "chrono-header"}, ["Time remaining"]),
        createElement("div", {id: "chrono-time"}, ["Pas assez de gens"])
    ]));
}
