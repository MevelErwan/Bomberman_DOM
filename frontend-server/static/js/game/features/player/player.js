import { sendToServer, userData } from "../../../main.js";
import { collision } from "./collision.js";

class Player {
    constructor(x, y, name, color, container) {
        this.div = document.createElement("div");
        this.div.id = name;
        this.div.className = "player";
        this.div.style.position = "absolute";
        this.div.style.left = "0%";
        this.div.style.bottom = "0%";
        this.div.style.backgroundColor = color;
        container.appendChild(this.div);


        // Initialiser les attributs data-translateX et data-translateY à 0
        this.div.setAttribute('data-translateX', `0%`);
        this.div.setAttribute('data-translateY', `0%`);
    }
}

function updateXYPlayer(name, dir,players) {
    if (!collision(dir, name,players)) {
        sendToServer({
            request: "updateXYPlayer",
            name: name,
            dir: dir
        })
    }
}

export function updateServerPlayerPosition(players) {
    
    for (let name in players) {
        for (let dir in players[name]["currentmove"]) {
            if (players[name]["currentmove"][dir]) {
                updateXYPlayer(name, dir,players)
            }
        }
    }
}

export function movePlayer(player) {
    if (document.getElementById(player["name"])) {
        let speed = 1.001;
        let joueur = document.getElementById(player["name"]);

        // Accédez directement à player["x"] et player["y"]
        let x = player["x"];
        let y = player["y"];

        setPosition(joueur, x, y);
    }
}

function setPosition(elem, x, y) {
    elem.style.left = x + "%";
    elem.style.bottom = y + "%";
    
}

export function addPlayerToMap(PValue, container) {
    return new Player(PValue["startx"], PValue["starty"], PValue["name"], PValue["color"], container)
}