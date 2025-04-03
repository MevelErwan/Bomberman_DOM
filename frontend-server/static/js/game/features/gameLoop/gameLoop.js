import { sendToServer, socket } from "../../../main.js";
import { movePlayer } from "../player/player.js";
import { updateServerPlayerPosition } from "../player/player.js";
import { destruct_power_up } from "../player/power_up.js";
import { spawnbomb } from "../player/bomb.js";
import { explosion } from "../player/bomb.js";
import { bombCollision, collision } from "../player/collision.js";
import { userData, MapData } from "../../../main.js";

var players

function getDataForNextLoop() {
    sendToServer({request: "getPlayersData"})
    //console.log(userData.username)
    sendToServer({request: "explosionCol", username: userData.username, range: userData.bomb_range})

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);  // Conversion du message JSON en objet
        switch (data["request"]) {
            case "allPlayers": {
                players = data["players"]
                break
            }
            case "destruct_power_up": {
                destruct_power_up(data["pos"])
                break
            }
            case "bomb_pose_for_all": {
                console.log(data)
                spawnbomb(data["value"],data["name"],data["range"])
                break
            }
            case "bomb_explode_for_all": {
                //console.log("bb")
                explosion(data["value"],data["range"])
                //console.log(data["name"])

                break
            
            }
            case "explosion_col": {
                if (MapData.build) {
                    bombCollision(data["username"])
                }
                break
            }
            case "bc_power_up":
                if (MapData.build) {
                    createPowerUp(data["postion"], data["type"])
                }
                break
        }
    }
    gameLoop(players)
}

function updatePlayerPosition(players) {
    for (let name in players) {
        movePlayer(players[name])
    }
}

export function gameLoop(players = "") {
    updatePlayerPosition(players)
    updateServerPlayerPosition(players)
    window.requestAnimationFrame(getDataForNextLoop)
}