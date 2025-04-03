import { createElement } from "../../../framework/src/domUtils.js"
import { MapID } from "../../socketReception.js"
import { MapData } from "../../../main.js"
import { power_up } from "../player/power_up.js"

let container = document.getElementById("main-container")

let path = "../../../../assets/map/"

const map = []
const all_type = []
export const all_case = []
const all_block = []

class Type {
    constructor(data_type) {
        this.num = data_type[0]
        this.coll = data_type[1]
    }
}

class Case {
    constructor(x , y , type) {
        this.type = get_type(type)
        this.div = document.createElement("div")
        this.div.className = "background"
        this.div.style.backgroundImage = "url(" + path + MapID + "/" + type + ".png)"
        this.div.style.position = "absolute"
        this.div.style.left = x + "%"
        this.div.style.bottom = y + "%"
        this.div.style.height = "6.5%"
        this.div.style.width = "6.5%"
        this.div.style.imageRendering = "pixelated";
        this.div.style.backgroundSize = "100% 100%"
        this.brick = null
        this.power_up = null
        this.bomb = null
        this.explosion = null
        container.appendChild(this.div)

          
    }
    new_power(num) {
        console.log(num)
        let div = document.createElement("div")
        div.style.backgroundImage = "url(../../../../assets/power_up/" + num + ".png)"
        div.style.position = "absolute"
        div.style.left = this.div.style.left
        div.style.bottom = this.div.style.bottom
        div.style.height = "6.5%"
        div.style.width = "6.5%"
        div.style.imageRendering = "pixelated";
        div.style.backgroundSize = "100% 100%"
        container.appendChild(div)
        this.power_up = [div,num]
        this.bomb = null
    }
    new_bomb(range) {
        this.bomb = new Bomb(range,this.div.style.left,this.div.style.bottom)
    }

    new_explosion(part,i) {
        this.explosion = new Explosion(this.div.style.left,this.div.style.bottom, part);
        setTimeout(() => {
                //console.log(all_case[i].explosion)
                if (all_case[i].explosion != null && all_case[i].explosion.div) {
                    all_case[i].explosion.div.remove();
                    all_case[i].explosion = null;
                }
        }, 500);
    }   

    destroyBrick() {
        let power_up = null;
        if (this.brick != null) {
         power_up = this.brick.power;
         console.log("id: ",power_up)
        }
        
        if (this.brick != null && !this.brick.break) {
            this.brick.div.remove();
            this.brick = null;
        }

        //TODO: fix power up drop random (difference between client)
        //drop power up
        if (power_up != null) { 
            this.new_power(power_up);
        }
    }

    new_life(x,y) {
        this.life = new Life(x,y)
    }


    
}

class Bomb {
    constructor(range,left,bottom) {
        this.div = document.createElement("div")
        this.div.style.backgroundImage = "url(../../../../assets/bomb/first_frame.png)"
        this.div.style.position = "absolute"
        this.div.style.left = left
        this.div.style.bottom = bottom
        this.div.style.height = "6.5%"
        this.div.style.width = "6.5%"
        this.div.style.imageRendering = "pixelated";
        this.div.style.backgroundSize = "100% 100%"
        this.range = range
        container.appendChild(this.div)

    }
}

class Explosion {
    constructor(x,y, part) {
        this.div = document.createElement("div")
        this.div.style.backgroundImage = part
        this.div.className = "explosion"
        this.div.style.position = "absolute"
        this.div.style.left = x
        this.div.style.bottom = y
        this.div.style.height = "6.5%"
        this.div.style.width = "6.5%"
        this.div.style.imageRendering = "pixelated";
        this.div.style.backgroundSize = "100% 100%"
        container.appendChild(this.div)
    }
}


class Block {
    constructor(i,power = null) {
        this.div = document.createElement("div")
        this.div.className = "block"
        this.div.style.backgroundImage = "url(" + path + "/" + MapID + "/" + "block.png)"
        this.div.style.position = "absolute"
        this.div.style.left = all_case[i].div.style.left
        this.div.style.bottom = all_case[i].div.style.bottom
        this.div.style.height = "6.5%"
        this.div.style.width = "6.5%"
        this.div.style.imageRendering = "pixelated";
        this.div.style.backgroundSize = "100% 100%"
        all_case[i].brick = this
        this.break = false
        this.power = power
        container.appendChild(this.div)
    }
}




export async function construct_map(nbrMap, blocks) {

    let temp = path + nbrMap
    await fetch(temp + "/map.json").then(response => {
        if (!response.ok) {
            throw new Error('don\'t exist, not ok');
        }
        return response.json();
    }).then(data => {
        data.type.forEach(element => {
            all_type.push(new Type(element))
        });
        data.map.forEach(element => {
            map.push(element)
        })
    })
    create_map(blocks)
}

function create_map(blocks) {
    let y = 80
    map.forEach(a =>{
        let x = 0
        a.split(" ").forEach(b =>{
            if (b != " ") {
                all_case.push(new Case(x , y , b))
                x += 6.5
            }
        })
        y -= 6.5
    }) 
    //console.log(all_case)
    pose_brick(blocks)
    console.log(all_case)
    MapData.build = true;
    MapData.map = all_case;
}

function pose_brick(block) {
    let i = 0
    block.forEach(a => {
        a.split(" ").forEach(b => {
            if (b == "b") {
                all_block.push(new Block(i))
            } else if (b <= 2) {
                all_block.push(new Block(i,b))
            }
                i++
            })
    })
}

function get_type(type) {
  let res = ""
  all_type.forEach(a => {
      if (a.num == type || a.num == "rest" && res == "") {
          res = a
      }
  })
  return res
}