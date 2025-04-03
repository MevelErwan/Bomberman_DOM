import { sendToServer, userData } from "../../../main.js"
import { all_case } from "../map/map.js"

export function power_up(val, i) {
    console.log(all_case[i] , Number(val))
    switch (Number(val)) {
        case 0:
            if (userData.speed < 0.3) {
                userData.speed += 0.02
                console.log("speed: ", userData.speed)
            }
            break
        case 1:
            userData.bomb_range += 1
            console.log("range: ", userData.bomb_range)
            break
        case 2:
            userData.bomb_posable += 1
            console.log("bomb: ", userData.bomb_posable)
            break
    }
    sendToServer({
        request: "Power_up Taked",
        name: userData.username,
        value: Number(val),
        pos: i
    })
}

export function destruct_power_up(i) {
    if (all_case[i].power_up != null) {
        all_case[i].power_up[0].remove();
        all_case[i].power_up = null;
    }
}