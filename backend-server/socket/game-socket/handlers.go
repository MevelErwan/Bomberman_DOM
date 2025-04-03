package game

import (
	"encoding/json"
	"fmt"

	dataStruct "backend/data"

	"golang.org/x/net/websocket"
)

func HandleWSGame(data []byte, ws *websocket.Conn) {
	// Decode the received data into a known structure.
	trueData, data := GetData(data)

	switch trueData.Request {

	case "getPlayersData":
		{
			SendInfoForGame()
			break
		}
	case "updateXYPlayer":
		{
			var trueData dataStruct.UpdateXYPlayer
			json.Unmarshal(data, &trueData)

			switch trueData.Dir {
			case "up":
				{
					LobbyPlayers[trueData.Name].Y += LobbyPlayers[trueData.Name].PowerUps.Speed
					break
				}
			case "down":
				{
					LobbyPlayers[trueData.Name].Y -= LobbyPlayers[trueData.Name].PowerUps.Speed
					break
				}
			case "right":
				{
					LobbyPlayers[trueData.Name].X += LobbyPlayers[trueData.Name].PowerUps.Speed
					break
				}
			case "left":
				{
					LobbyPlayers[trueData.Name].X -= LobbyPlayers[trueData.Name].PowerUps.Speed
					break
				}
			}

			break
		}

	case "StartMove":
		{
			var trueData dataStruct.MovePlayer
			json.Unmarshal(data, &trueData)
			switch trueData.Value {
			case "Up":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Up = true
					break
				}
			case "Down":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Down = true
					break
				}
			case "Left":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Left = true
					break
				}
			case "Right":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Right = true
					break
				}
			}
			break
		}

	case "EndMove":
		{
			var trueData dataStruct.MovePlayer
			json.Unmarshal(data, &trueData)
			switch trueData.Value {
			case "Up":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Up = false
				}
			case "Down":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Down = false
				}
			case "Left":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Left = false
				}
			case "Right":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Right = false
				}
			}
			break
		}
	case "Power_up Taked":
		{
			var trueData dataStruct.Power_up_taked
			json.Unmarshal(data, &trueData)
			println(trueData.Value)
			switch trueData.Value {
			case 0:
				{
					if LobbyPlayers[trueData.Name].PowerUps.Speed < 0.3 {
						LobbyPlayers[trueData.Name].PowerUps.Speed += 0.02
					}
					break
				}
			case 1:
				{
					LobbyPlayers[trueData.Name].PowerUps.Flame += 1
					println(LobbyPlayers[trueData.Name].PowerUps.Flame)
					println(trueData.Name)
					break
				}
			case 2:
				{
					LobbyPlayers[trueData.Name].PowerUps.Bombs += 1
					break
				}
			}
			toSend, _ := json.Marshal(dataStruct.Power_up_taked{
				Request: "destruct_power_up",
				Name:    trueData.Name,
				Value:   trueData.Value,
				Pos:     trueData.Pos,
			})

			for _, player := range LobbyPlayers {
				player.Socket.Write(toSend)
			}
			break
		}
	case "Posebomb":
		{
			var trueData dataStruct.Bomb
			json.Unmarshal(data, &trueData)
			toSend, err := json.Marshal(dataStruct.BombExplode{
				Request: "bomb_pose_for_all",
				Name:    trueData.Name,
				Value:   trueData.Value,
				Range:   LobbyPlayers[trueData.Name].PowerUps.Flame,
			})

			fmt.Println(err)

			for _, player := range LobbyPlayers {
				player.Socket.Write(toSend)
			}
			break
		}

	case "BombExplode":
		{
			var trueData dataStruct.BombExplode
			json.Unmarshal(data, &trueData)
			toSend, err := json.Marshal(dataStruct.BombExplode{
				Request: "bomb_explode_for_all",
				Name:    trueData.Name,
				Value:   trueData.Value,
				Range:   trueData.Range,
			})
			if err != nil {
				fmt.Println(err)
			}

			for _, player := range LobbyPlayers {
				player.Socket.Write(toSend)
			}
			break

		}
	case "explosionCol":
		{
			var trueData dataStruct.ExplosionCol
			json.Unmarshal(data, &trueData)
			toSend, err := json.Marshal(dataStruct.ExplosionCol{
				Request:  "explosion_col",
				Username: trueData.Username,
			})
			if err != nil {
				fmt.Println(err)
			}

			for _, player := range LobbyPlayers {
				player.Socket.Write(toSend)
			}
			break
		}
	case "BCPowerUp":
		{
			var trueData dataStruct.BCPowerUp
			json.Unmarshal(data, &trueData)
			toSend, err := json.Marshal(dataStruct.BCPowerUp{
				Request:  "bc_power_up",
				Type:     trueData.Type,
				Position: trueData.Position,
			})
			if err != nil {
				fmt.Println(err)
			}

			for _, player := range LobbyPlayers {
				player.Socket.Write(toSend)
			}
			break
		}
	case "end":
		{
			var trueData dataStruct.Data
			json.Unmarshal(data, &trueData)
			//fmt.Println(trueData)
			toSend, err := json.Marshal(dataStruct.Data{
				Request: "end",
				Value:   trueData.Value,
			})
			if err != nil {
				fmt.Println(err)
			}

			for _, player := range LobbyPlayers {
				player.Socket.Write(toSend)
			}

		}
	}

}

func SendInfoForGame() {
	toSend, _ := json.Marshal(dataStruct.AllPlayer{
		Request: "allPlayers",
		Players: LobbyPlayers,
	})

	for _, player := range LobbyPlayers {
		player.Socket.Write(toSend)
	}
}
