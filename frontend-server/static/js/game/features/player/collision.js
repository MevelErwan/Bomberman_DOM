import { all_case } from "../map/map.js";
import { MapData, sendToServer, userData } from "../../../main.js";
import { power_up } from "./power_up.js";

export function collision(dir, username) {
  let player = document.getElementById(username);
  let speed = userData.speed + 0.05;
  let x = Number(player.style.left.replace("%", "")) + 2.75;
  let y = Number(player.style.bottom.replace("%", "")) + 7;
  let x_move = false;
  let res = false;
  {
    let i = (13 - Math.floor(y / 6.5)) * 15 + Math.floor(x / 6.5);
    if (all_case[i].power_up != null) {
      console.log(all_case[i])
      power_up(all_case[i].power_up[1], i);
      all_case[i].power_up[0].remove();
      all_case[i].power_up = null;
    }
    if (all_case[i].bomb == null) {
      userData.ignore_bomb = 0;
    }
  }
  switch (dir) {
    case "left": {
      x -= 2.75 + speed;
      x_move = true;
      break;
    }
    case "right": {
      x += 2.75 + speed;
      x_move = true;
      break;
    }
    case "up": {
      y += 2.75 + speed;
      break;
    }
    case "down": {
      y -= 2.75 + speed;
      break;
    }
  }
  var i;
  if (x_move) {
    i = (13 - Math.floor((y - 2) / 6.5)) * 15 + Math.floor(x / 6.5);
  } else {
    i = (13 - Math.floor(y / 6.5)) * 15 + Math.floor((x - 2) / 6.5);
  }
  if (
    (all_case[i].brick != null && !all_case[i].brick.break) ||
    all_case[i].type.coll == "wall" ||
    (all_case[i].bomb != null && i != userData.ignore_bomb)
  ) {
    res = true;
  }
  if (x_move) {
    i = (13 - Math.floor((y + 2) / 6.5)) * 15 + Math.floor(x / 6.5);
  } else {
    i = (13 - Math.floor(y / 6.5)) * 15 + Math.floor((x + 2) / 6.5);
  }
  if (
    (all_case[i].brick != null && !all_case[i].brick.break) ||
    all_case[i].type.coll == "wall" ||
    (all_case[i].bomb != null && i != userData.ignore_bomb)
  ) {
    res = true;
  }

  return res;
}

export function position_in_case(username) {
  let player = document.getElementById(username);
  let x = Number(player.style.left.replace("%", "")) + 2.75;
  let y = Number(player.style.bottom.replace("%", "")) + 7;

  return (13 - Math.floor(y / 6.5)) * 15 + Math.floor(x / 6.5);
}

export function bombCollision(username) {
  
  let  player = document.getElementById(username);
  let x;
  let y;
  //console.log(player)
  if (player != null) {
    x = Number(player.style.left.replace("%", "")) + 2.75;
    y = Number(player.style.bottom.replace("%", "")) + 7;
  }
  let i = (13 - Math.floor(y / 6.5)) * 15 + Math.floor(x / 6.5);
  //console.log(i)

  //console.log(all_case[i])

  if (all_case[i].explosion != null && !userData.recovery && player != null) {
    userData.life -= 1;
    userData.recovery = true;
//    sendToServer({ request: "life", life: [userData.life+userData.username] })

    setTimeout(() => {
      userData.recovery = false;
    }, 1500);

    if (userData.life == 0) {
      player.remove();
      endScreen();
    }
  }
  
}


const endScreen = () => {
  let maincontainer = document.getElementById("main-container");
  let end = `<div class="endScreen" style="position: absolute; top: 0%;left: 0%;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.5);z-index: 1000;">
  <div class="endScreen" style="position: absolute; top: 50%;left: 50%;transform: translate(-50%, -50%);width: 50%;height: 50%;background-color: rgba(255, 255, 255, 0.5);z-index: 1000;">
  <p>Fin de la partie</p>
  <button onclick="window.location.href = '/';">Retour à l'accueil</button>
  </div>
  </div> `;
  maincontainer.innerHTML += end;

}



