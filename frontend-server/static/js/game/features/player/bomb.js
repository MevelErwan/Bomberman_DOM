import { all_case } from "../map/map.js";
import { userData } from "../../../main.js";
import { position_in_case } from "./collision.js";

export function spawnbomb(i, username, range) {
    console.log(range);
    if (position_in_case(username) == i) {
        userData.ignore_bomb = i;
    }
    all_case[i].new_bomb(range);
    console.log("start");
    setTimeout(() => explosion(i, range), 3000); 
}

export function explosion(i, range) {
    // Remove the bomb from the case
    if (all_case[i].bomb) {
        all_case[i].bomb.div.remove();
        all_case[i].bomb = null;
    }
        //TODO:: power up handling
    

    // Create explosion center
    let part = "url(../../../../assets/bomb/mid.png)";
    all_case[i].new_explosion(part,i);

    // Create explosion in each direction
    createExplosionInDirection(i, range, -1, "left", "side_horizontal"); 
    createExplosionInDirection(i, range, 1, "right", "side_horizontal"); 
    createExplosionInDirection(i, range, -15, "up", "side_vertical"); 
    createExplosionInDirection(i, range, 15, "down", "side_vertical");
    
    destroyAdjacentBricks(i, range);
    
   
}

function createExplosionInDirection(startIndex, range, step, endDirection, sideDirection) {
    let j = startIndex;
    for (let k = 0; k < range; k++) {
        j += step;
        if (j < 0 || j >= all_case.length) {
            break;
        }

        // Check for collision with brick, wall, or hard floor
        if (all_case[j].type.coll == "wall") {
            break;
        }

        // Prepare the explosion part
        let part;
        if (k === range - 1) {
            part = `url(../../../../assets/bomb/${endDirection}.png)`;
        } else {
            part = `url(../../../../assets/bomb/${sideDirection}.png)`;
        }

        all_case[j].new_explosion(part,j );

        // Check for player collision 
        

        // Stop the explosion if it hits a brick or wall
        if (all_case[j].type.coll == "wall" ) {  
            break;
        }
    }
}


function destroyAdjacentBricks(startIndex, range) {
    const directions = [-1, 1, -15, 15]; 
    directions.forEach(direction => {
        let j = startIndex;
        for (let k = 0; k < range; k++) {
            j += direction;
            if (j < 0 || j >= all_case.length) {
                break;
            }

            if (all_case[j].type.coll === "wall") {
                break; 
            }
            all_case[j].destroyBrick();
        }        
    });
  }