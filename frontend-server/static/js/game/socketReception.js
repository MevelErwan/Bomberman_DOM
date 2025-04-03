import { modifyUrlGame } from "../game/features/routes.js";
import { addPlayerToMap } from "./features/player/player.js";
import { initControls } from "./features/control/control.js";
import { gameLoop } from "./features/gameLoop/gameLoop.js";
//import { movePlayer } from "./features/player/player.js";
import { userData } from "../main.js";


export var MapID = ""
export var playerList = 0;

const app = document.getElementById("main-container")

export function socketReceptionGame(data, ip) {
    //console.log(data)
    switch (data["request"]){
        case "GoToGame": {
            MapID = data["mapid"]
            modifyUrlGame("Game", "/game", ip, data)
            break
        }

        case "createNewPlayer": {
            addPlayerToMap(data["player"], app)
            break
        }

        case "LaunchGame": {
            gameLoop()
            initControls(userData.username)
            //createLife();
            break
        }
        case "MovePlayer": {
            movePlayer(data["name"], data["value"])
            break
        }
        case "end": {
            playerList = data["value"]
            console.log(playerList)
            break
        }
        //case 
    }
}

function createLife() {
    let maincontainer = document.getElementById("main-container")

    let life = `<div class="life" style="position: absolute; top: 10%;left: 5%;">
    <img src="../assets/images/heart.png" alt="life" style="width: 10%;height: 10%;">
    </div> `
    for (let i = 0; i < userData.life; i++) {
        life += `<div class="life" style="position: absolute; top: 10%;left: ${5 + 10 * i}%;"><img id=${"life"+i} src="../assets/images/heart.png" alt="life" style="width: 10%;height: 10%;"></div>`
    }
    maincontainer.innerHTML += life
}