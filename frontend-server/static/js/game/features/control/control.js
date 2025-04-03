import { sendToServer, userData } from "../../../main.js"
import { position_in_case } from "../player/collision.js"
import { all_case } from "../map/map.js"

export function initControls(username) {
    if (document.getElementById(username)) {
        document.addEventListener("keydown", (e) => {
            onKeyDown(e, username)
        })
        
        document.addEventListener("keyup", (e) => {
            onKeyUp(e, username)
        })

        window.addEventListener("resize", () => {
            userData.innerWidth = window.innerWidth
            userData.innerHeight = window.innerHeight
        })
    }
}

function onKeyDown(e, username) {
    switch (e.key) {
        case "ArrowRight": {
            sendToServer({
                request: "StartMove",
                name: username,
                value: "Right"
            })
            break
        }
        case "ArrowLeft": {
            sendToServer({
                request: "StartMove",
                name: username,
                value: "Left"
            })
            break
        }
        case "ArrowUp": {
            sendToServer({
                request: "StartMove",
                name: username,
                value: "Up"
            })
            break
        }
        case "ArrowDown": {
            sendToServer({
                request: "StartMove",
                name: username,
                value: "Down"
            })
            break
        }
        case "u": {
            let val = Math.floor(Math.random()*3)
            all_case[17].new_power(val)
            break
            
        }
        case "v": {
            all_case[17].new_power(0)
            break
            
        }
        case " ": {
            let block = position_in_case(username) 
            sendToServer({
                request: "Posebomb",
                name: username,
                value: block
            })
            break
        }
    }
}

function onKeyUp(e, username) {
    switch (e.key) {
        case "ArrowRight": {
            sendToServer({
                request: "EndMove",
                name: username,
                value: "Right"
            })
            break
        }
        case "ArrowLeft": {
            sendToServer({
                request: "EndMove",
                name: username,
                value: "Left"
            })
            break
        }
        case "ArrowUp": {
            sendToServer({
                request: "EndMove",
                name: username,
                value: "Up"
            })
            break
        }
        case "ArrowDown": {
            sendToServer({
                request: "EndMove",
                name: username,
                value: "Down"
            })
            break
        }
    }
}